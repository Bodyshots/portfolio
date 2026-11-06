import HomeCoin from "../HomeCoin";
import SectionHeader from "../SectionHeader";

const HomeAbout = () => {
  return (
    <>
      <SectionHeader text="About" />
      <div id="about">
        <div id="about_text">
          <div id="about_texttitle">Welcome to my website!</div>
          <div id="about_textbody">
            <div>
              Hi! I'm Lanz, a full-stack developer that's recently graduated
              with a Computer Science (CS) and Applied Statistics major (and a
              minor in Mathematics)!
              <br />
              <br />
              I've previously worked as a Research Assistant, teaching hundreds
              of 1st and 2nd year students foundational skills to help them on
              their journey through CS. Currently, I've been working on creating
              web applications while dabbling a little bit into AI, being eager
              to make my mark on the industry.
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                }}
              >
                Want to connect? Scroll down below to take a look at my socials.
                Hope to chat with you soon!
              </div>
            </div>
          </div>
        </div>
        <HomeCoin />
      </div>
    </>
  );
};

export default HomeAbout;
