import { Suspense } from "react";
import Link from "next/link";

import MealsGrid from "@/components/meals/meals-grid";
import MealsLoadingPage from "./loading-out";
import classes from "./page.module.css";
import { getMeals } from "@/lib/meals";


/* 
  Automatikusan átadódik, nem kell külön meghívni, nextJS feature
  title: A tabfül neve
  description: Oldal leírása (látni a jobb klikk -> oldal forrásának megekintése)
*/
export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community'
}

const Meals = async () => {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
};

const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself, It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href={"/meals/share"}>Share your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
