import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../context/Auth/AuthContext";
import Grid from "@mui/material/Grid";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../Cart/CartContext";

function Navbar() {
const { username, isAuthenticated, logout } = useAuth();
const { cartItems } = useCart();
const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
);

const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
};

const handleCloseUserMenu = () => {
    setAnchorElUser(null);
};

const navigate = useNavigate();

const handleLogin = () => {
    navigate("/login");
};

const handleLogout = () => {
    logout()
    navigate("/");
    handleCloseUserMenu()
};

const handleCart = () => {
    navigate("/cart");
};

return (
    <AppBar position="static">
    <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Grid container alignItems="center" justifyContent="space-between">
            <Button onClick={()=> navigate('/')}>
            <Box sx={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center"
            }}>
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                }}
            >
                Tech Hub
            </Typography>
            </Grid>

            </Box>
            </Button>

            <Box display="flex" flexDirection="row" alignItems="center" gap={2} flexGrow={0}>

                <IconButton onClick={handleCart} aria-label="cart">
                <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon sx={{color:"#ffffff"}} />
                </Badge>
                </IconButton>
                {isAuthenticated ? (
                <>
                    <Tooltip title="Open settings">
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                        <Typography>{username}</Typography>
                        </Grid>
                        <Grid item>
                        <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                        >
                            <Avatar
                            alt={username || ""}
                            src="/static/images/avatar/2.jpg"
                            />
                        </IconButton>
                        </Grid>
                    </Grid>
                    </Tooltip>
                    <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: "center" }}>
                        My Orders
                        </Typography>
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>
                        <Typography sx={{ textAlign: "center" }}>
                        Logout
                        </Typography>
                    </MenuItem>
                    </Menu>
                </>
                ) : (
                <Button
                    onClick={handleLogin}
                    variant="contained"
                    color="success"
                >
                    Login
                </Button>
                )}
            </Box>
        </Grid>
        </Toolbar>
    </Container>
    </AppBar>
);
}

export default Navbar;
