import cv2
import mediapipe as mp
import math
import sys
import json
import os

def euclidean_distance_px(p1, p2, landmarks, w, h):
    x1, y1 = landmarks[p1].x * w, landmarks[p1].y * h
    x2, y2 = landmarks[p2].x * w, landmarks[p2].y * h
    return math.dist((x1, y1), (x2, y2))

def landmark_visible(landmark, threshold=0.5):
    v = getattr(landmark, 'visibility', None)
    if v is None:
        return True
    return v >= threshold

def recommend_size(measurements):
    h = measurements["Height"]
    shoulder = measurements["Shoulder Width"]
    hip = measurements["Hip Width"]
    neck = measurements["Neck Circumference"]

    ratio_shoulder = shoulder / h * 100
    ratio_hip = hip / shoulder if shoulder > 0 else 1.0
    ratio_neck = neck / shoulder if shoulder > 0 else 0.5

    if h < 160 or ratio_shoulder < 16.5:
        size = "S"
    elif 160 <= h < 170 and 16.5 <= ratio_shoulder < 18.0:
        size = "M"
    elif 170 <= h < 178 and 18.0 <= ratio_shoulder < 19.0:
        size = "L"
    elif 178 <= h < 186 and 19.0 <= ratio_shoulder < 20.5:
        size = "XL"
    elif 186 <= h < 195 or ratio_shoulder >= 20.5:
        size = "XXL"
    else:
        size = "M"

    if ratio_hip > 1.25:
        size = "XL"
    elif ratio_neck > 1.15:
        size = "XXL"

    return size

def process_image(image_path, user_height_cm):
    mp_pose = mp.solutions.pose
    # Use higher complexity for better accuracy
    pose = mp_pose.Pose(static_image_mode=True, model_complexity=2, min_detection_confidence=0.5)
    
    image = cv2.imread(image_path)
    if image is None:
        return {"error": f"Image not found or could not be read: {image_path}"}

    h, w, _ = image.shape
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)
    
    if not results.pose_landmarks:
        return {"error": "No person detected. Make sure the full body is visible."}

    landmarks = results.pose_landmarks.landmark

    # Height Calibration
    # Find top (min y) and bottom (max y)
    ys = [lm.y * h for lm in landmarks if landmark_visible(lm, 0.2)]
    if not ys:
        return {"error": "Not enough visible landmarks to calibrate."}
        
    top_y = min(ys)
    
    # Prioritize ankles/heels for bottom
    ankles = []
    for idx in (mp_pose.PoseLandmark.LEFT_ANKLE, mp_pose.PoseLandmark.RIGHT_ANKLE, 
                mp_pose.PoseLandmark.LEFT_HEEL, mp_pose.PoseLandmark.RIGHT_HEEL, 
                mp_pose.PoseLandmark.LEFT_FOOT_INDEX, mp_pose.PoseLandmark.RIGHT_FOOT_INDEX):
        try:
            if landmark_visible(landmarks[idx], 0.2):
                ankles.append(landmarks[idx].y * h)
        except:
            pass
            
    if ankles:
        bottom_y = max(ankles)
    else:
        bottom_y = max(ys) # fallback
        
    height_px = bottom_y - top_y
    if height_px <= 0:
        return {"error": "Could not determine person height in pixels."}
        
    # CALIBRATION: user's real height / pixel height
    scale_cm_per_px = user_height_cm / height_px

    # Shoulder width
    shoulder_px = euclidean_distance_px(mp_pose.PoseLandmark.LEFT_SHOULDER, mp_pose.PoseLandmark.RIGHT_SHOULDER, landmarks, w, h)
    shoulder_cm = round(shoulder_px * scale_cm_per_px, 1)

    # Hip width
    hip_px = euclidean_distance_px(mp_pose.PoseLandmark.LEFT_HIP, mp_pose.PoseLandmark.RIGHT_HIP, landmarks, w, h)
    hip_cm = round(hip_px * scale_cm_per_px, 1)

    # Arms: average of left and right
    arm_left_px = euclidean_distance_px(mp_pose.PoseLandmark.LEFT_SHOULDER, mp_pose.PoseLandmark.LEFT_WRIST, landmarks, w, h)
    arm_right_px = euclidean_distance_px(mp_pose.PoseLandmark.RIGHT_SHOULDER, mp_pose.PoseLandmark.RIGHT_WRIST, landmarks, w, h)
    arm_cm = round(((arm_left_px + arm_right_px) / 2) * scale_cm_per_px, 1)

    # Legs: average left/right hip->ankle
    leg_left_px = euclidean_distance_px(mp_pose.PoseLandmark.LEFT_HIP, mp_pose.PoseLandmark.LEFT_ANKLE, landmarks, w, h)
    leg_right_px = euclidean_distance_px(mp_pose.PoseLandmark.RIGHT_HIP, mp_pose.PoseLandmark.RIGHT_ANKLE, landmarks, w, h)
    leg_cm = round(((leg_left_px + leg_right_px) / 2) * scale_cm_per_px, 1)

    neck_circ_cm = round((shoulder_px * 0.30 * scale_cm_per_px) * math.pi, 1)

    data = {
        "Height": user_height_cm,
        "Shoulder Width": shoulder_cm,
        "Hip Width": hip_cm,
        "Arm Length": arm_cm,
        "Leg Length": leg_cm,
        "Neck Circumference": neck_circ_cm
    }

    size = recommend_size(data)

    return {
        "success": True,
        "measurements": data,
        "recommended_size": size,
        "scale_cm_per_px": scale_cm_per_px
    }

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Usage: python cli.py <image_path> <height_cm>"}))
        sys.exit(1)
        
    image_path = sys.argv[1]
    try:
        user_height = float(sys.argv[2])
    except ValueError:
        print(json.dumps({"error": "Height must be a number."}))
        sys.exit(1)
        
    result = process_image(image_path, user_height)
    print(json.dumps(result))
