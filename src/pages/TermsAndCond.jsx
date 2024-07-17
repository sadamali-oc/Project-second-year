import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import Layout from "../components/Layout";

export default function TermsAndCond() {
  return (
    <Layout>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ p: 5 }}>
          <Typography
            color="#201d61"
            variant="h4"
            fontWeight={600}
            gutterBottom
          >
            Terms and Conditions
          </Typography>

          <Divider sx={{ marginBottom: 2 }} />
          <Typography
            variant="subtitle2"
            sx={{ fontSize: "1.4em" }}
            gutterBottom
          >
            These are the terms and conditions of the Plazer app.
          </Typography>
          <Box sx={{ paddingLeft: 5 }}>
            <Typography variant="body1" gutterBottom>
              1. You must be 18 years or older to use the app.
            </Typography>
            <Typography variant="body1" gutterBottom>
              2. You must not use the app for any illegal activities.
            </Typography>
            <Typography variant="body1" gutterBottom>
              3. You must not use the app to harass or bully other users.
            </Typography>
            <Typography variant="body1" gutterBottom>
              4. You must not use the app to spread hate speech.
            </Typography>
            <Typography variant="body1" gutterBottom>
              5. You must not use the app to spread fake news.
            </Typography>
            <Typography variant="body1" gutterBottom>
              6. You must not use the app to spread adult content.
            </Typography>
            <Typography variant="body1" gutterBottom>
              7. You must not use the app to spread spam.
            </Typography>
            <Typography variant="body1" gutterBottom>
              8. You must not use the app to spread malware.
            </Typography>
            <Typography variant="body1" gutterBottom>
              9. You must not use the app to spread viruses.
            </Typography>
            <Typography variant="body1" gutterBottom>
              10. You must not use the app to spread ransomware.
            </Typography>
            <Typography variant="body1" gutterBottom>
              11. You must not use the app to spread spyware.
            </Typography>
            <Typography variant="body1" gutterBottom>
              12. You must not use the app to spread adware.
            </Typography>
            <Typography variant="body1" gutterBottom>
              13. You must not use the app to spread scareware.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
}