import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useFlags, InitialFlagState } from "flags/client";
import { getFlags } from "flags/server";
import { Logo } from "../components/logo";
import dynamic from "next/dynamic";
import React from "react";

type ServerProps = { initialFlagState: InitialFlagState };

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  // We preload the feature flags on the server
  // This is optional. HappyKit Flags also works without server-side rendering.
  const flagBag = await getFlags({ context });
  return { props: { initialFlagState: flagBag.initialFlagState } };
};

const Home: NextPage<ServerProps> = (props) => {
  const flagBag = useFlags({ initialState: props.initialFlagState });

  return (
    <div className={styles.container}>
      <Head>
        <title>Feature Flags in Five</title>
        <meta name="description" content="A Next.js feature flags example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {flagBag.flags?.newHeadline ? (
          <React.Fragment>
            <h1 className={styles.title}>Welcome to Feature Flags</h1>
            <Confetti />
          </React.Fragment>
        ) : (
          <h1 className={styles.title}>Feature Flags for Next.js</h1>
        )}

        <p className={styles.description}>
          Get started by following the{" "}
          <a
            href="https://frontend-digest.com/next-js-feature-flags-in-5-minutes-c0fa6822b3b8?sk=46fd76bdd3afb1ffdb96ed60f966c86c"
            className={styles.articleLink}
          >
            instructions
          </a>
        </p>

        {flagBag.flags?.showBanner ? <Banner /> : null}

        <div className={styles.grid}>
          {flagBag.flags?.hideDocumentation ? null : (
            <a
              href="https://github.com/happykit/flags/tree/master/package"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <h2>Documentation &rarr;</h2>
              <p>
                Find in-depth information about @happykit/flags features and
                API.
              </p>
            </a>
          )}

          <a
            href="https://twitter.com/happykitdev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Twitter &rarr;</h2>
            <p>Ask questions by sending a DM to @happykitdev on Twitter.</p>
          </a>

          <a
            href="https://flags.happykit.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Example &rarr;</h2>
            <p>Discover and deploy a comprehensive example project.</p>
          </a>

          <a
            href="https://happykit.dev/?ref=flags-in-five&stay"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Website &rarr;</h2>
            <p>Learn more about feature flags in HappyKit on our website.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/happykit/flags?ref=flags-in-five"
          target="_blank"
          rel="noopener noreferrer"
        >
          Feature Flags by <Logo className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

/**
 * The banner uses code splitting and will only be loaded when the
 * showBanner feature flag is on.
 */
const Banner = dynamic(() => import("../components/banner"));
/**
 * The confetti uses code splitting and will only be loaded when the
 * showConfetti feature flag is on.
 */
const Confetti = dynamic(() => import("../components/confetti"), {
  ssr: false,
});

export default Home;
