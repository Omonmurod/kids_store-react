import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import { Favorite, Visibility } from "@mui/icons-material";
import Badge from "@mui/material/Badge";

export function WishList(props: any) {
  const events_list = Array.from(Array(6).keys());

  return (
    <div className="wish_list">
      <Container>
        <Stack
          className="left_shop"
          style={{
            width: "780px",
            marginRight: "100px",
          }}
        >
          <Stack className="shop_products">
            {events_list.map((value, number) => {
              return (
                <Stack className="shop_product-info">
                  <Stack className={"product-box"}>
                    <Box
                      className={"img"}
                      sx={{
                        backgroundImage: `url("/icons/teddy-bear.jpeg")`,
                      }}
                    >
                      <Box className={"dish_sale"}>
                        <div className={"dish_sale-txt"}>Sale 20%</div>
                      </Box>
                      <Button
                        className={"like_view_btn"}
                        style={{ left: "36px" }}
                      >
                        <Badge badgeContent={8} color="secondary">
                          <Checkbox
                            icon={<Favorite style={{ color: "white" }} />}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            checked={true}
                          />
                        </Badge>
                      </Button>
                      <Button
                        className={"like_view_btn"}
                        style={{ right: "36px" }}
                      >
                        <Badge badgeContent={16} color="secondary">
                          <Checkbox
                            icon={<Visibility style={{ color: "white" }} />}
                            checkedIcon={
                              <Visibility style={{ color: "red" }} />
                            }
                            checked={false}
                          />
                        </Badge>
                      </Button>
                    </Box>
                  </Stack>
                  <Stack className={"product_name"}>Taddybear Toy</Stack>
                  <Stack className={"rating_box"}>
                    <Rating
                      className="half-rating"
                      defaultValue={3.5}
                      precision={0.5}
                    />
                  </Stack>
                  <Stack className={"price"}>
                    <span
                      style={{
                        fontFamily: "Nunito",
                        fontWeight: "900",
                        textDecoration: "line-through",
                        fontSize: "19px",
                      }}
                    >
                      $70
                    </span>
                    <span
                      style={{
                        fontFamily: "Nunito",
                        fontWeight: "900",
                        color: "orange",
                        fontSize: "20px",
                      }}
                    >
                      $50
                    </span>
                  </Stack>
                  <Stack
                    display={"flex"}
                    marginLeft={"40px"}
                    marginTop={"15px"}
                    className="btn"
                  >
                    <Button
                      variant="contained"
                      style={{
                        borderRadius: "30px",
                        color: "#ffffff",
                        background: "#ffa600",
                        fontFamily: "Nunito",
                        height: "45px",
                        width: "160px",
                        fontWeight: "900",
                        fontSize: "16px",
                      }}
                      onClick={(e) => {
                        //props.onAdd(product);
                        e.stopPropagation();
                      }}
                    >
                      ADD TO CART
                    </Button>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
        <Stack
          sx={{ my: "40px" }}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box className={"bottom_box"}>
            {/* <Pagination
              count={
                followersSearchObj.page >= 3 ? followersSearchObj.page + 1 : 3
              }
              page={followersSearchObj.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"primary"}
                />
              )}
              onChange={handlePaginationChange}
            /> */}
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
