import { Page, Document, Text } from '@react-pdf/renderer';
import styles from "../services/pdf.styles.css"

export const PdfFile = () => {
  return (

    <Document>
      <Page >
        <Text>Hello</Text>
      </Page>
    </Document>
  )
}