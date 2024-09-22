import { getMeal } from "@/lib/meals";
import Image from "next/image";
import classes from "./page.module.css";
import { notFound } from "next/navigation";

/* 
    fill:
    <Image src={image} alt={title} fill />
    1.) Kitölti a szülőkomponensek által kapott helyet.
    2.) Így nem kell a height, width propokat megadni

    src={image}: 
    1.) image akkor, ha a public/image mappában vannak a képek
    2.) és a not-used mappa initdb.js-db je fut (más az image paraméter az obejktumokban)

*/

/* 
  Automatikusan kiértékelődik, nem kell külön meghívni, nextJS feature
  title: A tabfül neve
  description: Oldal leírása (látni a jobb klikk -> oldal forrásának megekintése)

  Van amikor csak egy metadata-t definiálunk (meals/page.js),
  viszont dinamikus oldalak esetén a generateMetadata() fggv szükséges
*/
export const generateMetadata = async ({ params }) => {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
};

const MealDetailsPage = ({ params }) => {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    // beépített függvény, a struktúrában a legközelebb
    // lévő not-found vagy error page-re visz el.
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          {/* <Image src={meal.image} alt={meal.title} fill /> */}
          <Image
            src={`https://boj11kf-nextjs-demo-users-image.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailsPage;
