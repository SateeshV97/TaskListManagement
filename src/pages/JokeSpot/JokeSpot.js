import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { taskActions } from "../../redux/slices/TaskActions";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TabularView from "./TabularView";
import { useNavigate } from "react-router";
import { Link } from "@mui/material";
const JokeSpt = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    React.useEffect(() => {
        dispatch({ type: taskActions.FETCH_JOKE_API });
    },[])
    const {jokesData, isLoading} = useSelector((state) => state.tasks);
    return(
        <>
        <TabularView rows={jokesData}/>
        <Link
        style={{cursor : 'pointer'}}
        variant="body2" onClick={() => navigate('/viewTasks')}>
                Back
              </Link>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </>
    )
};

export default JokeSpt;