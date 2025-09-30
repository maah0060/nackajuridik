import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

function Navbar() {
	return (
		<div className={styles.navbar}>
			<div className={styles.navbarLogoDiv}>
				<Link href="/">
					<img
						src="/images/logo.jpg"
						alt="Nacka Juridik logo"
						className={styles.navbarLogo}
					/>
				</Link>
			</div>
			<div className={styles.navbarMenu}>
				<div className={styles.navbarItem}>
					<Link href="/">Start</Link>
				</div>
				<div className={styles.navbarItem}>
					<Link href="/aktuellt">Aktuellt</Link>
				</div>
				<div className={styles.navbarItem}>Om oss</div>
				<div className={styles.navbarItem}>Nyhetsbrev</div>
				<div className={styles.navbarItem}>Kontakta oss</div>
			</div>
			<div className="navbar-cta"></div>
		</div>
	);
}

export default Navbar;
