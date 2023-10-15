import React, { useEffect } from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";
import './SpeechAnimation.css';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "AntonFamily",
  },
  text: {
    margin: 2,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "AntonFamily",

  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
});

const PDFFile = (props) => {
    useEffect(()=>{
        console.log(props.text);
    },[props.text])

  const pageColors = ['#f6d186', '#f67280', '#c06c84'];

  const pages = [
    {text: props.Text, image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
  ]

  return (
    <>
    <Document>
      {pages.map((page, index) => {
        return (
          <Page key={index} style={{...styles.body}}>
          <Text style={styles.header} fixed>
          </Text>
          <Text style={styles.text}>
          {page.text}
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </Page>
        )
      })}
    </Document>
    </>
  );
};

export default PDFFile;