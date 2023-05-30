import React, { useRef, useState } from "react"

import HTMLFlipBook from 'react-pageflip';
import Img from "gatsby-image"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="pages page-cover" ref={ref} data-density="hard">
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

    const [page, setPage] = useState(0);

    let flipBook = useRef(null)

    const pages = data.allAlgoriJson.nodes;
    const cover = data.cover
    const backCover = data.backCover

    const [totalPages] = useState(20);

    const nextButtonClick = () => {
        if (flipBook.current) {
            flipBook.current.pageFlip().flipNext();
        }
    };

    const prevButtonClick = () => {
        if (flipBook.current) {
            flipBook.current.pageFlip().flipPrev();
        }
    };

    return (
        <Layout>
            <Seo title="Algori - Brandbook 2022" />
            <div className="algori-page pt-5">
                <SlidingText text={"Algori - Brandbook 2022"} />
                <div className="container">
                    <HTMLFlipBook
                        className="flipbook mx-auto mb-5"
                        ref={flipBook}
                        width={500}
                        height={710}
                        minWidth={400}
                        minHeight={568}
                        showCover={true}
                        onFlip={(e) => setPage(e.data)}
                    >
                        <PageCover><Img fixed={cover?.childImageSharp?.fixed} /></PageCover>
                        {pages.map((page, index) => (
                            <Page key={`page-${index}`}>
                                <Img fixed={page.img?.childImageSharp?.fixed} />
                            </Page>
                        ))}
                        <PageCover><Img fixed={backCover?.childImageSharp?.fixed} /></PageCover>
                    </HTMLFlipBook>

                    <div className="row info">
                        <div className="col-4 prev">
                            <button type="button" className="btn btn-primary" onClick={() => prevButtonClick()}>
                                Previous page
                            </button>
                        </div>
                        <div className="col-4 text-center">
                            {page > 0 && <span>{page} of </span>}{totalPages} pages
                        </div>
                        <div className="col-4 next">
                            <button type="button" className="btn btn-primary" onClick={() => nextButtonClick()}>
                                Next page
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    cover: file(relativePath: { eq: "algori/1.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    },
    backCover: file(relativePath: { eq: "algori/44.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    },
    allAlgoriJson {
      nodes {
        img {
            childImageSharp {
                fixed {
                ...GatsbyImageSharpFixed
                }
            }
        }
      }
    }
  }
`;

export default Algori
