import { useState } from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

function App() {
    const [url, setUrl] = useState("");
    const [helperTextUrl, setHelperTextUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [hasShortUrl, setHasShortUrl] = useState(false);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        setHelperTextUrl("");
    };

    const handleAliasChange = (e) => {
        setAlias(e.target.value);
    };

    const handleSubmit = async (e) => {
        if (url === "") {
            setHelperTextUrl("This field is required");
        }

        const data = {
            url: url,
            alias: alias,
        };

        try {
            let resp = await axios.post(
                "http://localhost:5000/shortenUrl",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setShortUrl(resp.data.shortenedUrl);
            setHasShortUrl(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            spacing={4}
        >
            <Grid item xs={12} sm={12} md={8} lg={4}>
                <Grid container direction="column" spacing={4}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            required
                            id="url"
                            fullWidth
                            label="Url"
                            value={url}
                            onChange={handleUrlChange}
                            placeholder="https://www.google.com"
                            helperText={helperTextUrl}
                            error={helperTextUrl !== "" ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            id="alias"
                            fullWidth
                            label="Custom Alias"
                            value={alias}
                            onChange={handleAliasChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="primary"
                            onClick={() => handleSubmit()}
                            disabled={helperTextUrl !== "" ? true : false}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {hasShortUrl && (
                            <Card>
                                <CardContent>
                                    <Typography variant="body2">
                                        {shortUrl}
                                        <br />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                shortUrl
                                            )
                                        }
                                    >
                                        Copy
                                    </Button>
                                    <Link href={shortUrl}>Head Over!</Link>
                                </CardActions>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
