import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import "../../../css/about.css";
import { ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

export function AboutPage() {
  /** INITIALIZATIONS */
  const [value, setValue] = React.useState("1");
  const faq = [
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer: "To'lovni Payme, Click ilovalari orqali amalga oshirish mumkin",
    },
    {
      question: "Buyurtmalar qancha vaqtda yetib keladi?",
      answer:
        "Byurtmalar harid qilgan narsangizga qarab har xil vaqtda yetkazilishi mumkin.",
    },
    {
      question:
        "Saytdan foydalansam ma'lumotlarim xavfsizligiga kafolat bormi?",
      answer:
        "Albatta, biznign dasturchilarimiz sizning ma'lumotlaringiz xavfsizligini ta'minlaydilar.",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer: "To'lovni Payme, Click ilovalari orqali amalga oshirish mumkin",
    },
    {
      question: "Buyurtmalar qancha vaqtda yetib keladi?",
      answer:
        "Byurtmalar harid qilgan narsangizga qarab har xil vaqtda yetkazilishi mumkin.",
    },
    {
      question:
        "Saytdan foydalansam ma'lumotlarim xavfsizligiga kafolat bormi?",
      answer:
        "Albatta, biznign dasturchilarimiz sizning ma'lumotlaringiz xavfsizligini ta'minlaydilar.",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer: "To'lovni Payme, Click ilovalari orqali amalga oshirish mumkin",
    },
    {
      question: "Buyurtmalar qancha vaqtda yetib keladi?",
      answer:
        "Byurtmalar harid qilgan narsangizga qarab har xil vaqtda yetkazilishi mumkin.",
    },
    {
      question:
        "Saytdan foydalansam ma'lumotlarim xavfsizligiga kafolat bormi?",
      answer:
        "Albatta, biznign dasturchilarimiz sizning ma'lumotlaringiz xavfsizligini ta'minlaydilar.",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer: "To'lovni Payme, Click ilovalari orqali amalga oshirish mumkin",
    },
    {
      question: "Buyurtmalar qancha vaqtda yetib keladi?",
      answer:
        "Byurtmalar harid qilgan narsangizga qarab har xil vaqtda yetkazilishi mumkin.",
    },
    {
      question:
        "Saytdan foydalansam ma'lumotlarim xavfsizligiga kafolat bormi?",
      answer:
        "Albatta, biznign dasturchilarimiz sizning ma'lumotlaringiz xavfsizligini ta'minlaydilar.",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer: "To'lovni Payme, Click ilovalari orqali amalga oshirish mumkin",
    },
    {
      question: "Buyurtmalar qancha vaqtda yetib keladi?",
      answer:
        "Byurtmalar harid qilgan narsangizga qarab har xil vaqtda yetkazilishi mumkin.",
    },
    {
      question:
        "Saytdan foydalansam ma'lumotlarim xavfsizligiga kafolat bormi?",
      answer:
        "Albatta, biznign dasturchilarimiz sizning ma'lumotlaringiz xavfsizligini ta'minlaydilar.",
    },
  ];

  /** HANDLERS */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help_page"} style={{ backgroundColor: "white"}}>
      <Container maxWidth={"lg"} sx={{ mt: "50px", mb: "50px" }}>
        <TabContext value={value}>
          <Box className={"help_menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                aria-label="lab API tabs example"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Tab className="tab_txt" label="About Kids World" value={"1"} />
                <Tab className="tab_txt" label="Contact Us" value={"2"} />
                <Tab className="tab_txt" label="FAQ" value={"3"} />
              </TabList>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help_main_content"}>
              <TabPanel value={"1"}>
                <Stack className={"theRules_box1"} flexDirection={"row"}>
                  <Stack>
                    <img
                      src="/icons/about1.png"
                      className="image-with-shadow"
                      style={{
                        width: "511px",
                        marginTop: "38px",
                        marginLeft: "50px",
                        borderRadius: "40px",
                      }}
                    />
                  </Stack>
                  <Stack display={"flex"} style={{ marginLeft: "70px" }}>
                    <Box
                      style={{
                        color: "#000",
                        fontFamily: "Arial",
                        fontWeight: "600",
                        lineHeight: "normal",
                        fontSize: "30px",
                        letterSpacing: "2px",
                      }}
                    >
                      <div style={{ marginLeft: "190px", marginTop: "35px" }}>
                        About{" "}
                        <span
                          style={{
                            color: "#fd0200",
                            fontFamily: "Arial",
                            fontWeight: "600",
                            lineHeight: "normal",
                            fontSize: "30px",
                          }}
                        >
                          Kids
                        </span>
                        World{" "}
                      </div>
                      <div>
                        <img
                          src="/icons/aboutline1.png"
                          style={{
                            marginLeft: "145px",
                            marginTop: "-2px",
                            width: "350px",
                          }}
                        />
                      </div>
                    </Box>
                    <Box
                      style={{
                        color: "#000",
                        fontFamily: "Arial",
                        fontWeight: "600",
                        lineHeight: "normal",
                        fontSize: "30px",
                        letterSpacing: "2px",
                        marginTop: "70px",
                        width: "500px",
                      }}
                    >
                      "Happy, healthy{" "}
                      <span
                        style={{
                          color: "#fd0200",
                          fontFamily: "Arial",
                          fontWeight: "600",
                          lineHeight: "normal",
                          fontSize: "30px",
                        }}
                      >
                        Kids{" "}
                      </span>{" "}
                      and this is at the heart of everything we do"
                    </Box>
                    <Box
                      style={{
                        marginTop: "50px",
                        letterSpacing: "2px",
                      }}
                    >
                      <div
                        style={{
                          color: "#09168a",
                          fontFamily: "Arial",
                          fontSize: "22px",
                          fontWeight: "600",
                        }}
                      >
                        Jacob Robertson
                      </div>
                      <div
                        style={{
                          color: "#000",
                          fontFamily: "Arial",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Ceo,{" "}
                        <span
                          style={{
                            color: "#fd0200",
                            fontFamily: "Arial",
                            fontWeight: "600",
                            lineHeight: "normal",
                            fontSize: "16px",
                          }}
                        >
                          Kids
                        </span>
                        World
                      </div>
                    </Box>
                  </Stack>
                </Stack>
                <Stack className={"theRules_box2"}>
                  <Stack>
                    <Box
                      style={{
                        color: "#000",
                        fontFamily: "Arial",
                        fontWeight: "600",
                        lineHeight: "normal",
                        fontSize: "30px",
                        letterSpacing: "2px",
                      }}
                    >
                      <a
                        href="http://localhost:3000/brand"
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{ marginLeft: "20px", marginTop: "75px" }}>
                          <span
                            style={{
                              color: "#fd0200",
                              fontFamily: "Arial",
                              fontWeight: "600",
                              lineHeight: "normal",
                              fontSize: "30px",
                            }}
                          >
                            Kids
                          </span>
                          World Products
                        </div>
                      </a>
                      <div>
                        <img
                          src="/icons/aboutline2.png"
                          style={{
                            marginLeft: "10px",
                            marginTop: "-2px",
                            width: "400px",
                          }}
                        />
                      </div>
                    </Box>
                  </Stack>
                  <Stack display={"flex"}>
                    <Stack
                      flexDirection={"row"}
                      style={{ marginTop: "60px" }}
                      className="img"
                      justifyContent={""}
                    >
                      <Box className="img-icon">
                        <a href="http://:3000/products">
                          <img
                            className="icon"
                            src="/icons/about3.png"
                            style={{
                              width: "210px",
                              marginLeft: "10px",
                              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.4)",
                              borderRadius: "50px",
                            }}
                          />
                        </a>
                      </Box>
                      <Box className="img-icon">
                        <a href="http://:3000/products">
                          <img
                            className="icon"
                            src="/icons/about5.png"
                            style={{
                              width: "210px",
                              marginLeft: "40px",
                              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.4)",
                              borderRadius: "50px",
                            }}
                          />
                        </a>
                      </Box>
                      <Box className="img-icon">
                        <a href="http://localhost:3000/products">
                          <img
                            className="icon"
                            src="/icons/about4.png"
                            style={{
                              width: "210px",
                              marginLeft: "40px",
                              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.4)",
                              borderRadius: "50px",
                            }}
                          />
                        </a>
                      </Box>
                      <Box style={{ marginTop: "-14px" }} className="img-icon">
                        <a href="http://localhost:3000/products">
                          <figure>
                            <img
                              className="icon"
                              src="/icons/about6.png"
                              style={{
                                width: "205px",
                                marginLeft: "7px",
                                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.4)",
                                borderRadius: "50px",
                              }}
                            />
                          </figure>
                        </a>
                      </Box>
                      <Box className="img-icon">
                        <a href="http://localhost:3000/products">
                          <img
                            className="icon"
                            src="/icons/about7.png"
                            style={{
                              width: "210px",
                              marginLeft: "5px",
                              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.4)",
                              borderRadius: "50px",
                            }}
                          />
                        </a>
                      </Box>
                    </Stack>
                    <Stack
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      width="1320"
                    >
                      <Box
                        style={{
                          marginTop: "0px",
                          color: "#fd0200",
                          fontFamily: "Arial",
                          fontWeight: "600",
                          lineHeight: "normal",
                          fontSize: "30px",
                          letterSpacing: "2px",
                        }}
                      >
                        <div
                          style={{
                            marginLeft: "-95px",
                            marginTop: "55px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <p style={{ textAlign: "center" }}>
                            Dress your little girl as a {""}
                            <span
                              style={{
                                color: "#000",
                                fontFamily: "Arial",
                                fontWeight: "600",
                                lineHeight: "normal",
                                fontSize: "30px",
                              }}
                            >
                              Princess
                            </span>{" "}
                            of the kingdom,
                          </p>{" "}
                          <p
                            style={{ textAlign: "center", marginTop: "-16px" }}
                          >
                            who will conquer her dreams!🏆
                          </p>
                        </div>
                        <div
                          style={{
                            color: "#09168a",
                            fontFamily: "Arial",
                            fontSize: "22px",
                            fontWeight: "600",
                            marginLeft: "-120px",
                          }}
                        >
                          <p style={{ textAlign: "center" }}>Nabeela Pv</p>
                        </div>
                        <div
                          style={{
                            color: "#000",
                            fontFamily: "Arial",
                            fontSize: "16px",
                            fontWeight: "600",
                            marginLeft: "-140px",
                          }}
                        >
                          <p
                            style={{ textAlign: "center", marginTop: "-12px" }}
                          >
                            Ceo, Founder{" "}
                            <span
                              style={{
                                color: "#fd0200",
                                fontFamily: "Arial",
                                fontWeight: "600",
                                lineHeight: "normal",
                                fontSize: "16px",
                              }}
                            >
                              Kids
                            </span>
                            World
                          </p>
                        </div>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  className={"theRules_box3"}
                  flexDirection={"row"}
                  style={{ marginTop: "125px" }}
                >
                  <Stack display={"flex"}>
                    <Box
                      style={{
                        color: "#000",
                        fontFamily: "Arial",
                        fontWeight: "600",
                        lineHeight: "normal",
                        fontSize: "24px",
                        letterSpacing: "1px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Nunito",
                          color: "#00bbae",
                          fontWeight: "900",
                        }}
                      >
                        New Born Babies Care
                      </div>
                    </Box>
                    <Box
                      style={{
                        color: "#724D37",
                        fontFamily: "Nunito",
                        fontWeight: "700",
                        lineHeight: "normal",
                        fontSize: "18px",
                        letterSpacing: "1px",
                        marginTop: "20px",
                        marginRight: "40px",
                        width: "450px",
                      }}
                    >
                      If you're a first-time parent, put your fears aside and
                      get the basics in this guide about burping, bathing,
                      bonding, and other baby-care concerns.
                    </Box>
                  </Stack>
                  <Stack>
                    <img
                      src="/icons/about8.png"
                      className="image-with-shadow"
                      style={{
                        width: "350px",
                        height: "230px",
                        borderRadius: "40px",
                      }}
                    />
                  </Stack>
                </Stack>
                <Stack
                  className={"theRules_box4"}
                  flexDirection={"row"}
                  style={{ marginTop: "65px", marginBottom: "20px" }}
                >
                  <Stack>
                    <img
                      src="/icons/about9.png"
                      className="image-with-shadow"
                      style={{
                        width: "350px",
                        height: "230px",
                        borderRadius: "40px",
                        marginLeft: "25px",
                      }}
                    />
                  </Stack>
                  <Stack display={"flex"}>
                    <Box
                      style={{
                        color: "#000",
                        fontFamily: "Arial",
                        fontWeight: "600",
                        lineHeight: "normal",
                        fontSize: "24px",
                        letterSpacing: "1px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Nunito",
                          color: "#FF7E9A",
                          fontWeight: "900",
                          marginLeft: "30px",
                        }}
                      >
                        Happy Moments
                      </div>
                    </Box>
                    <Box
                      style={{
                        color: "#724D37",
                        fontFamily: "Nunito",
                        fontWeight: "700",
                        lineHeight: "normal",
                        fontSize: "18px",
                        letterSpacing: "1px",
                        marginTop: "20px",
                        marginLeft: "30px",
                        width: "500px",
                      }}
                    >
                      <p>
                        Birthdays are for loved ones, friends, and family
                        members who are still living. A celebration of life,
                        <br /> on the other hand.
                      </p>
                    </Box>
                  </Stack>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className={"admin_letter_box"} flexDirection={"row"}>
                  <Stack className={"admin_letter_container"}>
                    <Box className={"admin_letter_frame"}>
                      <span>Contact Us</span>
                      <p className="admin_intro" style={{ marginTop: "30px" }}>
                        Assalomu alaykum!
                        <br /> Please, fill the following blank to contact with
                        our admin!
                      </p>
                    </Box>
                    <form
                      action={"#"}
                      method={"POST"}
                      className={"admin_letter_frame"}
                    >
                      <div className={"admin_input_box"}>
                        <input
                          type={"text"}
                          name={"mb_nick"}
                          placeholder={"Your Name"}
                          style={{ fontFamily: "Nunito" }}
                        />
                      </div>
                      <div className={"admin_input_box"}>
                        <input
                          type={"text"}
                          name={"mb_email"}
                          placeholder={"Your Email"}
                          style={{ fontFamily: "Nunito" }}
                        />
                      </div>
                      <div className={"admin_input_box"}>
                        <textarea
                          name={"mb_msg"}
                          placeholder={"Your Valuable Message"}
                          style={{ fontFamily: "Nunito" }}
                        />
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "10px" }}
                      >
                        <Link to="/about"></Link>
                        <Button
                          style={{
                            backgroundColor: "#ffa602",
                            borderRadius: "10px",
                          }}
                          variant={"contained"}
                        >
                          Send Message
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                  <Stack
                    sx={{ mt: "34px" }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      style={{
                        marginLeft: "90px",
                        marginBottom: "20px",
                        fontFamily: "Nunito",
                        fontWeight: "850",
                        fontSize: "38px",
                      }}
                    >
                      Our Location
                    </Box>
                    <iframe
                      style={{
                        borderRadius: "10p",
                        marginTop: "0px auto",
                        marginLeft: "100px",
                      }}
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.0213138318804!2d126.9198304757964!3d37.5545616248148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98c3573d2a15%3A0x58af68b89488af4e!2zSCZNIO2ZjeuMgOygkA!5e0!3m2!1sen!2skr!4v1693885254315!5m2!1sen!2skr"
                      width="570"
                      height="400"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </Stack>
                </Stack>
              </TabPanel>
              <TabPanel value={"3"}>
                <Stack className={"accordian_menu"}>
                  {faq.map((ele) => {
                    return (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{ele.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{ele.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
