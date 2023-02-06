import { styled } from '@mui/system';
import { AppBar, makeStyles, Paper,useTheme } from '@mui/material';



export const StyledBar = styled(AppBar)(({ theme }) =>({
    
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
}
))



export const StyledPaper = styled(Paper)(({ theme }) =>({
    
    padding: theme.spacing(1),
    // '& .MuiTextField-root': {
    //     margin: theme.spacing(1),}
}
))



export const NavbarStyles={
   
    appBar: {   
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        // [theme.breakpoints.down('sm')]: {
        //   flexDirection: 'column',
        // },
      },
      heading: {
        //color: theme.palette.primary.main,
        textDecoration: 'none',
        fontSize: '2em',
        fontWeight: 300,
      },
      image: {
        marginLeft: '10px',
        marginTop: '5px',
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
        // [theme.breakpoints.down('sm')]: {
        //   width: 'auto',
        // },
      },
      profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
        alignItems: 'center',
        // [theme.breakpoints.down('sm')]: {
        //   width: 'auto',
        //   marginTop: 20,
        //   justifyContent: 'center',
        // },
      },
      logout: {
        marginLeft: '20px',
      },
      userName: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
      },
      brandContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      purple: {
        color: 'red',
        backgroundColor: 'red',
      },
}
