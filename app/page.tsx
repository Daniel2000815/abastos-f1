"use client";

// import React, { useEffect, useState } from "react";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import {app, db} from "../config/firebase"; 
import { getDatabase, ref, onValue } from "firebase/database";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import {DbTest} from "../components/db-test";
export default function Home() {

  // const [data, setData] = useState<any[]>([]);

// useEffect(() => {
//     // Initialize the Firebase database with the provided configuration
//     const database = getDatabase(app);
    
//     // Reference to the specific collection in the database
//     const collectionRef = ref(database, "times");

//     // Function to fetch data from the database
//     const fetchData = () => {
//       // Listen for changes in the collection
//       onValue(collectionRef, (snapshot) => {
//         const dataItem = snapshot.val();

//         // Check if dataItem exists
//         if (dataItem) {
//           // Convert the object values into an array
//           const displayItem = Object.values(dataItem);
//           setData(displayItem);
//           console.log(displayItem);
//         }
//       });
//     };

//     // Fetch data when the component mounts
//     fetchData();

//   }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>
    
      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
      {/* <div>
      <h1>Data from database:</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div> */}
<DbTest/>
      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
