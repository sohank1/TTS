import Link from "next/link";
import { Button } from "@material-ui/core";

export const HomePage = () => {
    const navLinks = [
        { name: 'Dashboard', svg: 'app-dashboard', path: '/dashboard' },
        { name: 'Bugs', svg: 'app-bugs', path: '/bugs' },
        { name: 'News', svg: 'app-news', path: '/news' },
        { name: 'Patch Notes', svg: 'app-patch-notes', path: '/patch-notes' },
    ];
    return (
        <div className="home-page">
            <nav>
                <Link href="/">
                    <Button className="tts-button">TTS</Button>
                </Link>
                <div className="links">
                    {navLinks.map(link => (
                        <Link key={link.path} href={link.path}>
                            <Button className="a">{link.name}</Button>
                        </Link>
                    ))}

                </div>
                {/* <button className={styles.hamburger}> */}
                {/* <app-hamburger></app-hamburger> */}
                {/* </button> */}
            </nav>

            <div className="grid">
                <div className="text">
                    <h1>The Tomatohead Society</h1>
                    <p>The Tomatohead Society (TTS) is a Fortnite clan that
                    strongly supports Team Pizza and is always looking
                for new members like you!</p>

                    <section>
                        <div>
                            <Button variant="contained" color="primary">Login</Button>
                        </div>
                        {/* <app-login *ngIf="!user"></app-login>
                <app-home-logout *ngIf="user"></app-home-logout>
                <app-join></app-join> */}
                    </section>
                </div>
                <img className="tomatohead" src="/assets/tomatohead.png" alt="A picture of tomatohead." />
            </div>

            <article className="team-pizza">
                <img src="assets/pizza.svg" alt="A picture of a pizza." />
                <div className="text">
                    <h1>Team Pizza</h1>
                    <p>Team Pizza is the team for Tomatohead in the Food war
                    and was the biggest motivator for creating TTS. We
                    heavily support Team Pizza, so If you’d like to join,
                we recommend you support them too.</p>
                </div>
            </article>

            <article className="discord">
                <img src="assets/chat.svg" alt="A picture of a pizza." />
                <div className="text">
                    <h1>Discord</h1>
                    <p>We have a Discord server! our server,
                    is where you can
                    talk to the mods, do tryouts, attend giveaways, share
                    your opinion on polls, and so much more! We do most
                    of our stuff on Discord, so you should join if you
                want to see what’s happening!</p>
                </div>
            </article>

            <article className="something">
                <img src="assets/together.svg" alt="A picture of a pizza." />
                <div className="text">
                    <h1>Something</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Bibendum magna morbi facilisis tellus diam amet. Enim
                magna. changed</p>
                    {/* <app-journey></app-journey> */}
                </div>
            </article>
        </div>
    )
}