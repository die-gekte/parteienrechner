import React, { SyntheticEvent, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Checkbox,
  Container,
  css,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import {
  Besoldungsgruppe,
  CalculatorFn,
  ContributionDetail,
} from "./parties/contribution.ts";
import GitHubIcon from "@mui/icons-material/GitHub";
import SPD from "./parties/SPD.ts";
import CDU from "./parties/CDU.ts";
import FDP from "./parties/FDP.ts";
import AfD from "./parties/AfD.ts";
import DieLinke from "./parties/DieLinke.ts";
import DieGruenen from "./parties/DieGruenen.ts";
import DiePartei from "./parties/DiePartei.ts";
import Piratenpartei from "./parties/Piratenpartei.ts";
import DieLinkeLogo from "./assets/DieLinke.png";
import SPDLogo from "./assets/SPD.png";
import FDPLogo from "./assets/FDP.png";
import CDULogo from "./assets/CDU.png";
import AfDLogo from "./assets/AfD.png";
import PiratenLogo from "./assets/Piratenpartei.png";
import DieGruenenLogo from "./assets/DieGruenen.png";
import DieParteiLogo from "./assets/DiePartei.png";
import { ColorModeContext } from "./App.tsx";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import RedditIcon from "@mui/icons-material/Reddit";
import SourceIcon from "@mui/icons-material/Source";

const lineItemStyle = css({
  fontWeight: "bolder",
  color: "#e74c3c",
});

const LineItem: React.FC<ContributionDetail> = ({ name, amount, approx }) => {
  return (
    <Grid container spacing={1}>
      <Grid xs={9} item>
        <span css={lineItemStyle}>{name}</span>
      </Grid>
      <Grid xs item>
        <span css={lineItemStyle}>
          {approx && "~"}
          {amount.toFixed(2)}€
        </span>
      </Grid>
    </Grid>
  );
};

export interface UserData {
  brutto: number;
  netto: number;
  isStudent: boolean;
  besoldung?: Besoldungsgruppe;
  isUnemployed: boolean;
  isRetired: boolean;
}

interface PartyProps {
  src: string;
  title: string;
  form: UserData;
  calculator: CalculatorFn;
}

const Party: React.FC<PartyProps> = ({ src, title, form, calculator }) => {
  // We have to destructure here or useMemo wouldn't work!
  const { brutto, netto, isRetired, isStudent, isUnemployed } = form;

  const result = useMemo(() => {
    return calculator({
      brutto,
      netto,
      isRetired,
      isStudent,
      isUnemployed,
    });
  }, [brutto, netto, isRetired, isUnemployed, isStudent, calculator]);

  return (
    <Paper
      css={{
        paddingTop: "1rem",
        padding: "1rem",
      }}
    >
      <Grid container spacing={3}>
        <Grid
          xs
          item
          css={{
            backgroundColor: "white",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          <img
            css={{
              maxWidth: "200px",
            }}
            src={src}
            alt={`Logo der Partei "${title}"`}
          />
        </Grid>
        <Grid lg={9} xs={12} item>
          <Stack spacing={1}>
            {result.details.map((e, i) => {
              return <LineItem key={i} {...e}></LineItem>;
            })}
            <hr />
            <LineItem
              name={"Gesamt / Monat"}
              amount={result.totalContribution}
              approx={result.approx}
            ></LineItem>
            <LineItem
              name={"Gesamt / Jahr"}
              amount={result.totalContribution * 12}
              approx={result.approx}
            ></LineItem>
          </Stack>
        </Grid>
        {result.notes.map((e, i) => {
          return (
            <Grid
              item
              key={i}
              css={{
                flexGrow: "1",
              }}
            >
              <Alert severity={e.severity}>{e.text}</Alert>
            </Grid>
          );
        })}
      </Grid>
      <Link
        href={result.source}
        title={"Quelle"}
        css={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
          paddingLeft: "8px",
        }}
        rel="noreferrer"
        color="inherit"
        underline={"hover"}
      >
        <SourceIcon
          css={{
            marginRight: "0.5rem",
          }}
        />{" "}
        Quelle
      </Link>
    </Paper>
  );
};

const Layout: React.FC = () => {
  const [values, setValues] = useState<UserData>({
    brutto: 4105,
    netto: 2630,
    isStudent: false,
    isUnemployed: false,
    isRetired: false,
  });
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCheckBoxChange = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean,
  ) => {
    const { name } = event.target as HTMLInputElement;

    console.log(name, checked);
    setValues({
      ...values,
      [name]: checked,
    });
  };

  return (
    <Container>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "baseline",
          "@media (max-width: 768px)": {
            flexDirection: "column",
          },
        }}
      >
        <h2
          css={{
            "@media (max-width: 768px)": {
              marginBottom: "0.25rem",
            },
          }}
        >
          Der Parteienrechner
        </h2>
        <h4
          css={{
            marginLeft: "2rem",
            marginBottom: "0.5rem",
            "@media (max-width: 768px)": {
              marginTop: "0.25rem",
              marginLeft: "0",
            },
          }}
        >
          Der wohl schlechteste Weg sich politisch auszurichten
        </h4>
      </div>
      <p
        css={{
          paddingBottom: "1rem",
        }}
      >
        Hier könnt ihr euer <b>monatliches</b> Einkommen eintragen und einen
        ungefähren Betrag bekommen, den euch die jeweilige Parteimitgliedschaft
        kosten würden.
      </p>
      <div
        css={{
          marginBottom: "1rem",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          <Grid>
            <Grid item>
              <TextField
                name={"brutto"}
                label={"Monatliches Bruttoeinkommen"}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={handleChange}
                value={values.brutto}
                css={{
                  display: "flex",
                  marginBottom: "1rem",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <TextField
              name={"netto"}
              label={"Monatliches Nettoeinkommen"}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={handleChange}
              value={values.netto}
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              css={{
                display: "flex",
                marginBottom: "1rem",
              }}
            />
            <Grid
              item
              css={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Student:in?"
                name={"isStudent"}
                onChange={handleCheckBoxChange}
                css={{
                  display: "flex",
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rentner:in?"
                name={"isRetired"}
                onChange={handleCheckBoxChange}
                css={{
                  display: "flex",
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Arbeitslos (ALGII)?"
                name={"isUnemployed"}
                onChange={handleCheckBoxChange}
                css={{
                  display: "flex",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
      <Stack
        css={{
          marginBottom: "3rem",
        }}
        spacing={1}
      >
        <Alert severity={"error"}>
          Die BetreiberInnen dieser Seite übernehemn keinerlei
          Verantwortung/Gewähr für die Richtigkeit und Aktualität dieser Daten.
        </Alert>
        <Alert severity={"error"}>
          Wer seine favorisierte Partei nach dem Mitgliedsbeitrag auswählt, ist
          dumm. Diese Seite dient nur dazu einen groben Vergleich zu bekommen.
          Lasst euch vor einem Beitritt nochmal beraten, um wirklich sicher zu
          sein, wie viel ein Beitritt wirklich kostet.
        </Alert>
        <Alert severity={"error"}>
          Die angegebenen Werte verlassen deinen Browser nicht. Also außer du
          hast Malware installiert oder so.
        </Alert>
      </Stack>
      <Stack spacing={3}>
        <Party
          src={DieLinkeLogo}
          calculator={DieLinke}
          title={"Die Linke"}
          form={values}
        />

        <Party src={SPDLogo} calculator={SPD} title={"SPD"} form={values} />

        <Party src={CDULogo} calculator={CDU} title={"CDU"} form={values} />

        <Party src={FDPLogo} calculator={FDP} title={"FDP"} form={values} />

        <Party src={AfDLogo} calculator={AfD} title={"AfD"} form={values} />

        <Party
          src={DieGruenenLogo}
          calculator={DieGruenen}
          title={"Die Grünen"}
          form={values}
        />

        <Party
          src={DieParteiLogo}
          calculator={DiePartei}
          title={"Die Partei"}
          form={values}
        />
        <Party
          src={PiratenLogo}
          calculator={Piratenpartei}
          title={"Piratenpartei"}
          form={values}
        />
      </Stack>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      >
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          <span
            css={{
              marginRight: "0.5rem",
            }}
          >
            {" "}
            {theme.palette.mode === "dark" ? "Dunkler" : "Heller"} Modus{" "}
          </span>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
      <Box
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <Link
          href={"https://github.com/die-gekte/parteienrechner"}
          title={"Mach mit auf GitHub"}
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          color="inherit"
          underline={"hover"}
          rel="noreferrer"
        >
          <GitHubIcon
            css={{
              marginRight: "0.5rem",
            }}
          />{" "}
          Mach mit bei der Entwicklung
        </Link>
        <Link
          href={"https://reddit.com/r/gekte"}
          title={"Triff uns auf Reddit"}
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          rel="noreferrer"
          color="inherit"
          underline={"hover"}
        >
          <RedditIcon
            css={{
              marginRight: "0.5rem",
            }}
          />{" "}
          /r/gekte auf Reddit
        </Link>
      </Box>
      <Paper
        css={{
          padding: "1rem",
        }}
      >
        <h2>Datenschutz und so</h2>
        <Box>
          Unser Hoster erhebt in sog. Logfiles folgende Daten, die Ihr Browser
          übermittelt:
          <List>
            <ListItem>IP-Adresse</ListItem>
            <ListItem>
              die Adresse der vorher besuchten Website (Referer Anfrage-Header)
            </ListItem>
            <ListItem>Datum und Uhrzeit der Anfrage</ListItem>
            <ListItem>HTTP-Statuscode</ListItem>
            <ListItem>übertragene Datenmenge</ListItem>
            <ListItem>Website, von der die Anforderung kommt</ListItem>
            <ListItem>
              Informationen zu Browser und Betriebssystem (z.B. User-Agent
              Anfrage-Header)
            </ListItem>
          </List>
        </Box>
        <Box>
          Das ist erforderlich, um unsere Website anzuzeigen und die Stabilität
          und Sicherheit zu gewährleisten. Dies entspricht unserem berechtigten
          Interesse im Sinne des Art. 6 Abs. 1 S. 1 lit. f DSGVO. Es erfolgt
          kein Tracking und wir haben auf diese Daten keinen direkten Zugriff,
          sondern erhalten lediglich eine anonymisierte, statistische
          Zusammenfassung. Diese beinhaltet die Adresse der vorher besuchten
          Seite, die Häufigkeit der jeweils aufgerufenen Seiten und die Anzahl
          eindeutiger Besucher. Diese Daten führen wir nicht mit anderen Daten
          zusammen.
        </Box>
        <Box>
          Wir setzen für die Zurverfügungstellung unserer Website folgenden
          Hoster ein:{" "}
          <Box
            css={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <b>
              GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107,
              United States.
            </b>
          </Box>
          Dieser ist Empfänger Ihrer personenbezogenen Daten. Dies entspricht
          unserem berechtigten Interesse im Sinne des Art. 6 Abs. 1 S. 1 lit. f
          DSGVO, selbst keinen Server in unseren Räumlichkeiten vorhalten zu
          müssen. Serverstandort ist USA. Weitere Informationen zu Widerspruchs-
          und Beseitigungsmöglichkeiten gegenüber GitHub finden Sie unter:
          <Link
            href={
              "https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-privacy-statement#github-pages"
            }
          >
            https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-privacy-statement#github-pages
          </Link>
        </Box>
        <Box>
          Sie haben das Recht der Verarbeitung zu widersprechen. Ob der
          Widerspruch erfolgreich ist, ist im Rahmen einer Interessenabwägung zu
          ermitteln. Die Daten werden gelöscht, sobald der Zweck der
          Verarbeitung entfällt. Die Verarbeitung der unter diesem Abschnitt
          angegebenen Daten ist weder gesetzlich noch vertraglich
          vorgeschrieben. Die Funktionsfähigkeit der Website ist ohne die
          Verarbeitung nicht gewährleistet. GitHub hat Compliance-Maßnahmen für
          internationale Datenübermittlungen umgesetzt. Diese gelten für alle
          weltweiten Aktivitäten, bei denen GitHub personenbezogene Daten von
          natürlichen Personen in der EU verarbeitet. Diese Maßnahmen basieren
          auf den EU-Standardvertragsklauseln (SCCs). Weitere Informationen
          finden Sie unter:
          <Link
            href={
              "https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-data-protection-addendum#attachment-1–the-standard-contractual-clauses-processors"
            }
          >
            https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-data-protection-addendum#attachment-1–the-standard-contractual-clauses-processors
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Layout;
