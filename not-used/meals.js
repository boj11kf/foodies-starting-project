import fs from "node:fs";
import { S3 } from '@aws-sdk/client-s3';

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: 'us-east-1'
});

const db = sql("meals.db");

/* 
    db.prepare('SELECT * FROM meals').all();
    1.) all() -> sorok lekérésére
    2.) run() -> adat beszúrásra
    3.) get() -> egy sor lekérésére

*/

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  //throw new Error("Loadin meals failed");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  //await new Promise((resolve) => (setTimeout(resolve, 5000)));

  //throw new Error("Loadin meals failed");
  // return db.prepare('SELECT * FROM meals WHERE slug = ' + slug).get(); // ez így sql injection
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
         )
    `
  ).run(meal);
}
