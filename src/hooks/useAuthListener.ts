// src/hooks/useAuthListener.ts
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function useAuthListener() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setDoc(
          doc(db, "users", user.uid),
          {
            email: user.email,
            hasLoggedIn: true,
            lastLogin: new Date(),
          },
          { merge: true }
        );
      }
    });

    return () => unsubscribe();
  }, []);
}
