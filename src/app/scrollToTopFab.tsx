import { KeyboardArrowUp } from "@mui/icons-material"
import { Box, Fab, Zoom, useScrollTrigger } from "@mui/material"
import { useCallback } from "react"

function ScrollToTopFab() {
  const trigger = useScrollTrigger({
    threshold: 100,
  })
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 35,
          zIndex: 1,
        }}
      >
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="large"
          aria-label="Scroll back to top"
        >
          <KeyboardArrowUp fontSize="large" />
        </Fab>
      </Box>
    </Zoom>
  )
}
export default ScrollToTopFab