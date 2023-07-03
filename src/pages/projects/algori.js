import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"
import React, { useRef, useState } from "react"

import HTMLFlipBook from 'react-pageflip';
import Layout from "../../components/layout"
import Logo from "../../assets/images/algori/logo.svg";
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="pages" ref={ref}>
            {props.children}
        </div>
    );
});

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="pages" ref={ref}>
            {props.children}
        </div>
    );
});

const Algori = ({ data }) => {

    const [page, setPage] = useState(-1);

    let flipBook = useRef(null)

    const pages = data.allAlgoriLookBookJson.nodes;

    const totalPages = 20;
    const [lastData, setLastData] = useState(0)

    const nextButtonClick = (e) => {
        if (flipBook.current) {
            flipBook.current.pageFlip().flipNext();
        }
    };

    const prevButtonClick = () => {
        if (flipBook.current) {
            flipBook.current.pageFlip().flipPrev();
        }
    };

    const changePage = (data) => {
        if (lastData < data) {
            setPage(page + 1)
        } else setLastData(page - 1)
        setLastData(data)
    };

    return (
        <Layout>
            <Seo title="Algori - Brandbook 2022" />
            <div className="algori-page pt-5">
                <SlidingText text={"Algori - Brandbook 2022"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                        <Logo />
                    </div>
                    <div className="col-7 mx-auto text-center">
                        <p>
                            Algori is a distinguished Portuguese shoe brand that prides itself on its commitment
                            to quality, craftsmanship, and a rich heritage.
                        </p>
                        <p className="mb-0">
                            Algori's partnership with The Feeting Room's consulting department has further elevated the brand's profile. With this, one of the challenges that i had was creating a brandbook and establish a distinctive aesthetic that will resonate with shoe enthusiasts worldwide.

                        </p>
                    </div>
                    <div className="col-9 mx-auto text-center my-5 buttons">
                        <a href="https://algoribrand.com/pt" target="_blank" rel="noreferrer" className="w-25 btn btn-primary">
                            VISIT WEBSITE
                        </a>
                        <a href="https://instagram.com/algoribrand" target="_blank" rel="noreferrer" className="w-25 btn btn-primary">
                            STALK INSTAGRAM
                        </a>
                    </div>
                    <HTMLFlipBook
                        className="flipbook mx-auto mb-5"
                        ref={flipBook}
                        width={500}
                        height={710}
                        minWidth={400}
                        minHeight={568}
                        showCover={true}
                        onFlip={(e) => changePage(e.data)}
                    >
                        <PageCover><StaticImage src={"../../assets/images/algori/1.png"} alt="Algori Lookbook Cover" /></PageCover>
                        {pages.map((page, index) => (
                            <Page key={`page-${index}`}>
                                <GatsbyImage image={getImage(page.img)} alt="Algori Lookbook page" />
                            </Page>
                        ))}
                        <PageCover><StaticImage src={"../../assets/images/algori/44.png"} alt="Algori Lookbook Back Cover" /></PageCover>
                    </HTMLFlipBook>

                    <div className="col-7 mx-auto text-center my-5 buttons buttons-pages">
                        <div className="w-25 prev">
                            <button type="button" className="btn btn-primary" onClick={() => prevButtonClick()}>
                                Previous page
                            </button>
                        </div>
                        <div className="w-25 text-center">
                            {page > 0 && page <= totalPages && <span>{page} of </span>}{totalPages} pages
                        </div>
                        <div className="w-25 next">
                            <button type="button" className="btn btn-primary" onClick={(e) => nextButtonClick(e)}>
                                Next page
                            </button>
                        </div>
                    </div>
                    <div className="col-7 mx-auto text-center mt-5">
                        <p>
                            In addition to developing the brandbook, we also create business cards, flyers,
                            and other digital and printed marketing materials.
                        </p>
                    </div>
                    <div className="col-12 text-center postcard mb-5">
                        <StaticImage src={"../../assets/images/algori/postcard.png"} alt="Algori Postcard" />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
query {
  allAlgoriLookBookJson {
    nodes {
      img {
        childImageSharp {
          gatsbyImageData(
            width: 800
          )
        }
      }
    }
  }
}
`;

export default Algori
