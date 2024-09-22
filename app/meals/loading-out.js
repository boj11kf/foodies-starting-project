

import classes from "./loading.module.css";

/* 
    Ha ez a komponens csak loading.js néven
    lenne mentve, akkor a NextJS tudná, hogy 
    mire való, és meghívni sem kellene a Suspensben

    Azonban, mivel mi azt szeretnénk, h a header
    az látszódjon a fetchelés alatt, így más nevet 
    adtunk neki és hasznaljuk a suspense komponens
    a megfelelo helyen

*/

const MealsLoadingPage = () => {
    return (
        <p className={classes.loading}>Fetching Meals...</p>
    );
};

export default MealsLoadingPage;