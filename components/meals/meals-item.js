import Link from "next/link";
import Image from "next/image";

import classes from "./meals-item.module.css";

/* 
    fill:
    <Image src={image} alt={title} fill />
    1.) Kitölti a szülőkomponensek által kapott helyet.
    2.) Így nem kell a height, width propokat megadni

    src={image}: 
    1.) image akkor, ha a public/image mappában vannak a képek
    2.) és a not-used mappa initdb.js-db je fut (más az image paraméter az obejktumokban)

*/

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/* <Image src={image} alt={title} fill /> */}
          <Image
            src={`https://boj11kf-nextjs-demo-users-image.s3.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
