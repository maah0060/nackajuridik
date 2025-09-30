import { wpQuery } from "@/lib/wpclients";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faGavel,
	faPhone,
} from "@fortawesome/free-solid-svg-icons";
import "../lib/fontawesome";
import Link from "next/link";

type Post = { title: string; slug: string };
type Data = { posts: { nodes: Post[] } };

export default async function Page() {
	const data = await wpQuery<Data>(`
    { posts(first: 10) { nodes { title slug } } }
  `);

	return (
		<div className={styles.startWrapper}>
			<div className={styles.startBanner}>
				<h1>
					<span className={styles.h1Small}>
						Bouppteckning, Testamente, Framtidsfullmakt eller Samboavtal?
					</span>
					<br />
					Vi ordnar de juridiska dokumenten!
				</h1>
			</div>
			<div className={styles.areasDiv}>
				<div className={styles.areas}>
					<h2>FASTIGHETSRÄTT</h2>
					<div className={styles.areasList}>
						<div className={styles.areasItem}>Köp av fastighet/bostadsrätt</div>
						<div className={styles.areasItem}>Samägande</div>
						<div className={styles.areasItem}>Dolda fel</div>
						<div className={styles.areasItem}>Servitut</div>
					</div>
				</div>
				<div className={styles.areas}>
					<h2>FAMILJERÄTT</h2>
					<div className={styles.areasList}>
						<div className={styles.areasItem}>Samboavtal </div>
						<div className={styles.areasItem}>Bodelning</div>
						<div className={styles.areasItem}>Äktenskapsförord</div>
						<div className={styles.areasItem}>Testamente</div>
						<div className={styles.areasItem}>Boupptäckning</div>
					</div>
				</div>
				<div className={styles.areas}>
					<h2>AVTALSRÄTT</h2>
					<div className={styles.areasList}>
						<div className={styles.areasItem}>Köp av fastighet/bostadsrätt</div>
						<div className={styles.areasItem}>Samägande</div>
						<div className={styles.areasItem}>Dolda fel</div>
						<div className={styles.areasItem}>Servitut</div>
					</div>
				</div>
			</div>
			<div className={styles.spacer}>
				<FontAwesomeIcon icon={faGavel} />
			</div>

			<div className={styles.contactUsDiv}>
				<h2>Vad kan vi göra för dig?</h2>
				<p>
					Även om du inte hittar ditt ärende under punkterna ovan så kan vi
					säkert hjälpa dig ändå, så hör av dig!
				</p>

				<div className={styles.contactUs}>
					Kontakta oss:
					<br />{" "}
					<a href="mailto:info@nackajuridik.se">
						<FontAwesomeIcon icon={faEnvelope} />
					</a>{" "}
					Mail: info@nackajuridik.se <br /> <FontAwesomeIcon icon={faPhone} />{" "}
					Mobil: 0733-703 668
				</div>
			</div>
		</div>
	);
}

// Global ISR för denna sida (kan sättas per fetch också)
export const revalidate = 60;
