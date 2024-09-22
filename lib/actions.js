"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

/* 
  A nextJS buildeléskor elkészíti az össze oldal html kódját
  és bármit csinálunk vele csak azokon lépked annak megfelelő
  módon, folyamat a cache-ben lévő kódokból dolgozik.

  Viszont mikor itemeket adunk hozzá, v törlünk, akkor szerver
  kommunikáció is szükséges, ezt oldjuk meg a *-al jelölt sorban.
  a revalidate() függvényen, az adott oldal adatait dobja a cache-ből
  és kéri az újat.
  
  Fontos, hogy ezzel kapcsolatos problémák csak production módban,
  jönnek fel. (buildelés után)
  
  Ha tudom, h a /meals page függ olyan adatoktól, amik változtak
  akkor:
  
   - revalidatePath("/meals")           -> Ezzel csak a /meals page.js-e 
                                            fog revalidálódni
   - revalidatePath("/meals", "page")   -> ugyan az, mint "page" nélkül
   - revalidatePath("/meals", "layout") -> a /meals-hez tartozó layout 
                                            minden elemének validálása
    + 1: revalidatePath("/", "layout")  -> a teljes app revalidálódik 
*/

const isInvalidText = (text) => {
  return !text || text.trim() === "";
};

export const shareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get("title"), // title az input field, name-je alapján (vagy id, idk)
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input."
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");  //  *magyarázat fentebb
  redirect("/meals");
};
