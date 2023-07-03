import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"
import React, { useRef, useState } from "react"

import HTMLFlipBook from 'react-pageflip';
import Layout from "../../components/layout"
import Logo from "../../assets/images/dulis-lookbook/logo.svg";
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

const DulisLookbook = ({ data }) => {

    const [page, setPage] = useState(-1);

    let flipBook = useRef(null)

    const pages = data.allDulisLookBookJson.nodes;

    const totalPages = 24;
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
            <Seo title="Dulis Shoes - SS23 Lookbook" />
            <div className="dulis-lookbook-page pt-5">
                <SlidingText text={"Dulis Shoes - SS23 Lookbook"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                        <Logo />
                    </div>
                    <div className="col-7 mx-auto text-center">
                        <p>
                            Dulis Shoes is a vibrant shoe brand catering to babies, kids, and moms, offering a delightful range of footwear. What sets Dulis Shoes apart is their commitment to manufacturing all their products in Portugal, a country known for its
                            exceptional craftsmanship and attention to detail.
                        </p>
                        <p className="mb-0">
                            As part of the Consulting department of The Feeting Room, I had the privilege of creating a captivating Lookbook for Dulis Shoes' Spring/Summer Collection of 2023.
                        </p>
                    </div>
                    <div className="col-9 mx-auto text-center my-5 buttons">
                        <a href="https://www.instagram.com/dulisshoes/" target="_blank" rel="noreferrer" className="w-25 btn btn-primary">
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
                        <PageCover><StaticImage src={"../../assets/images/dulis-lookbook/1.png"} alt="Dulis Lookbook Cover" /></PageCover>
                        {pages.map((page, index) => (
                            <Page key={`page-${index}`}>
                                <GatsbyImage image={getImage(page.img)} alt="Dulis Lookbook Page" />
                            </Page>
                        ))}
                        <PageCover><StaticImage src={"../../assets/images/dulis-lookbook/50.png"} alt="Dulis Lookbook Back Cover" /></PageCover>
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
                    <div className="col-7 mx-auto text-center final-text">
                        <p>
                            Through carefully curated visuals and engaging storytelling, the Lookbook captures the essence of Dulis Shoes, highlighting the brand's Portuguese heritage
                            and its dedication to craftsmanship.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
query {
  allDulisLookBookJson {
    nodes {
      img {
        childImageSharp {
          gatsbyImageData(width: 800)
        }
      }
    }
  }
}
`;

export default DulisLookbook
