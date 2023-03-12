// pages/external-data.js
import styles from "@/styles/Home.module.css";
import React, {useState} from "react";

export default function randomLine({ data } : any) {
    const [genericAnswer, setGenericAnswer] =  useState(
		"Joyful is the feeling of being grateful for the blessings in your life."
	);
	return (
		<div className={styles.main}>
			<h1>{genericAnswer}</h1>
			<button className={styles.next}>Next</button>
		</div>
	);
}

export async function getStaticProps() {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos");
	const data = await response.json();

	return {
		props: {
			data,
		},
	};
}
