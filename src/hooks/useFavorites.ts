import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../services/firebase";

export interface FavoriteCity {
  id: string;
  cityName: string;
  addedAt: number;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  useEffect(() => {
    const q = query(collection(db, "favorites"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FavoriteCity[];
      setFavorites(data);
    });

    return () => unsubscribe();
  }, []);

  const addFavorite = async (cityName: string) => {
    const alreadyExists = favorites.some(
      (fav) => fav.cityName.toLowerCase() === cityName.toLowerCase()
    );
    if (alreadyExists) return;

    await addDoc(collection(db, "favorites"), {
      cityName,
      addedAt: Date.now(),
    });
  };

  const removeFavorite = async (id: string) => {
    await deleteDoc(doc(db, "favorites", id));
  };

  const isFavorite = (cityName: string) => {
    return favorites.some(
      (fav) => fav.cityName.toLowerCase() === cityName.toLowerCase()
    );
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};