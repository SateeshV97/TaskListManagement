import React from "react";
import Table from "../../components/Table";
import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from "../../components/Search";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router";
import DialogBox from "../../components/DialogBox/DialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  setIsMode,
  setSelectedDetail,
  setSnackbarStatus,
  setTaskList,
} from "../../redux/slices/TaskSlice";
import moment from "moment";
import DatePicker from "../../components/DatePicker";
const ViewTasks = () => {
  const styles = {
    contextTextTitle: {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      fontSize: "20px",
      padding: "14px",
      fontFamily: "auto",
      fontWeight: 500,
    },
  };
  const GetStatusText = (startTime,endTime) => {
  React.useMemo(() => {
    const a = moment.utc(startTime).local().valueOf();
    const b = moment.utc(endTime).local().valueOf();
    const currentTime = moment().format('YYYY-MM-DDTHH:MM:SS[Z]').valueOf();
    const c = moment.utc(currentTime).local().valueOf();
    if (a < c && b < c) {
      return "Expired";
    }else if(a > c && b > c) {
      return "Scheduled";
    } else if(a < c && b > c){
      return "Running";
    };
},[startTime, endTime])
  };
  const GetStatus = ({ params }) => {
    const status = {
      scheduled: "#F6C00C",
      running: "#78AC79",
      expired: "#D05A57",
    };
    return (
      <div
        style={{
          backgroundColor:
            status[
              GetStatusText(params?.startTime, params?.endTime)?.toLowerCase()
            ],
          color: "white",
          padding: "2px 16px",
          borderRadius: "6px",
        }}
      >
        {GetStatusText(params?.startTime, params?.endTime)}
      </div>
    );
  };
  const headers = [
    {
      field: "taskname",
      headerName: "Task Name",
      sortable: true,
      renderType: "link",
      renderCell: (params) => {
        return (
          <div
            style={{ color: theme.appThemeColors.mainColor, cursor: "pointer" }}
            onClick={(e) => handleEditTask(e, params)}
          >
            {params?.row?.taskname}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      renderCell: (params) => {
        return <>{params?.row?.description}</>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return <GetStatus params={params.row} />;
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 50,
      align: "right",
      renderCell: (params) => {
        return (
          <Tooltip title={"Delete"}>
            <IconButton
              color="primary"
              aria-label={"Delete record"}
              onClick={(e) => handleDelete(e, params)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];
  headers.forEach((item) => {
    if (!item.headerAlign) item.headerAlign = "left";

    if (!item.align) item.align = "left";

    if (!item.flex) item.flex = 1;

    if (!item.disableColumnMenu) item.disableColumnMenu = true;

    if (!item.disableReorder) item.disableReorder = true;

    if (!item.sortable) item.sortable = false;
  });
  const { taskList } = useSelector((state) => state.tasks);
  const [rowsData, setRowsData] = React.useState(taskList ?? []);
  const [localRowData, setLocalRowData] = React.useState(taskList ?? []);
  const [deleteAction, setDeleteAction] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState({});
  const { isMode, selectedDetail } = useSelector((state) => state.tasks);

  const [fromDate, setFromDate] = React.useState();
  const [toDate, setToDate] = React.useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = (event, params) => {
    setDeleteAction(true);
    setSelectedRecord(params);
  };
  const handleEditTask = (event, params) => {
    navigate("/editTask");
    dispatch(setIsMode("edit"));
    dispatch(setSelectedDetail(params.row));
  };
  const CreateTask = () => {
    dispatch(setIsMode("add"));
    navigate("/createTask");
  };
  const handleOnSearchChange = (searchText) => {
    if (!searchText) {
      setRowsData(localRowData);
    } else {
      const lowerSearchTxt = searchText?.toLowerCase() || "";
      const filteredData = [...localRowData].filter((obj) => {
        return JSON.stringify(obj).toLowerCase().includes(lowerSearchTxt);
      });
      setRowsData(filteredData);
    }
  };
  const handleDeleteActions = (val) => {
    if (val === "ok") {
      setDeleteAction(false);
      const filteredData = rowsData.filter(
        (obj) => obj.id !== selectedRecord?.row?.id
      );
      dispatch(setTaskList(filteredData));
      setRowsData(filteredData);
      dispatch(
        setSnackbarStatus({
          open: true,
          severity: "success",
          message: "Deleted successfully",
        })
      );
    } else {
      setDeleteAction(false);
    }
  };
  const handleLogOut = () => {
    navigate("/");
    localStorage.clear();
    dispatch(reset());
  };
  const handleFilter = (fromDate, toDate, array) => {
    let ed = new Date(toDate).getTime();
    let sd = new Date(fromDate).getTime();
    const result = array.filter((d) => {
      let time = new Date(d.startTime).getTime();
      return sd < time && time < ed;
    });
    setRowsData(result);
  };
  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
    setRowsData(taskList);
  };
  return (
    <div style={{ display: "grid", gap: "10px", margin: "10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Search
          setSearchQuery={(searchText) => handleOnSearchChange(searchText)}
        />
        <DatePicker
          label={"From"}
          value={fromDate}
          onChange={(value) => setFromDate(value)}
        />
        <DatePicker
          label={"To"}
          value={toDate}
          minDate={fromDate}
          onChange={(value) => setToDate(value)}
        />
        <Button
          variant="contained"
          onClick={() => handleFilter(fromDate, toDate, rowsData)}
        >
          Filter
        </Button>
        <Button variant="contained" onClick={handleReset}>
          Reset
        </Button>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button variant="contained" onClick={() => navigate("/jokesSpot")}>
            Navigate to jokes spot
          </Button>
          <Button variant="contained" onClick={CreateTask}>
            Create Task
          </Button>
          <Button variant="contained" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      </div>
      <Table columns={headers} rows={rowsData ?? []} />
      <DialogBox
        open={deleteAction}
        onClose={() => {
          setDeleteAction(false);
        }}
        contentText={
          <div>
            <div style={styles.contextTextTitle}>
              Are you sure you want to delete this task?
            </div>
          </div>
        }
        title={"Confirmation"}
        showActions={true}
        positiveActionLabel={"YES"}
        negativeActionLabel={"NO"}
        onAction={(e, type) => handleDeleteActions(type, rowsData)}
      />
    </div>
  );
};
export default ViewTasks;
