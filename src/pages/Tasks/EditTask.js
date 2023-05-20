import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import TimeField from "../../components/TimeField";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSnackbarStatus, setTaskList } from "../../redux/slices/TaskSlice";
const EditTask = () => {
  const defaultData = {
    id: Math.floor(Math.random() * 110),
    taskname: "",
    description: "",
    startTime: moment(new Date()),
    endTime: moment(new Date()),
  };
  const { isMode, selectedDetail, taskList } = useSelector(
    (state) => state.tasks
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(defaultData ?? {});
  const [disabled, setDisabled] = React.useState(true);
  React.useEffect(() => {
    const startTime = moment(formData?.startTime);
    const endTime = moment(formData.endTime);
    if (
      formData.taskname !== "" &&
      formData.description !== "" &&
      endTime.diff(moment(startTime), 'minutes') >= 0
    ) {
      setDisabled(false);
    }
  }, [formData]);
  React.useEffect(() => {
    if (selectedDetail && isMode === "edit") {
      let a = {
        id: Math.floor(Math.random() * 110),
        taskname: selectedDetail.taskname,
        description: selectedDetail.description,
        startTime: moment(new Date(selectedDetail.startTime)),
        endTime: moment(new Date(selectedDetail.endTime)),
      };
      setFormData(a);
    }
  }, [selectedDetail]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDateChange = (val, type) => {
    setFormData({ ...formData, [type]: val });
  };
  const handleSave = () => {
    let alreadyExists = taskList?.some(
      (item) => item.taskname === formData.taskname
    );
    if (isMode === "add" && !alreadyExists) {
      let ab = [...taskList, formData];
      dispatch(setTaskList(ab));
      navigate("/viewTasks");
      dispatch(
        setSnackbarStatus({
          open: true,
          severity: "success",
          message: "Task created successfully",
        })
      );
    } else if (isMode === "edit") {
      let values = [...taskList];
      values[values.findIndex((x) => x.id === selectedDetail.id)] = formData;
      dispatch(setTaskList(values));
      navigate("/viewTasks");
      dispatch(
        setSnackbarStatus({
          open: true,
          severity: "success",
          message: "Task updated successfully",
        })
      );
    } else {
      dispatch(
        setSnackbarStatus({
          open: true,
          severity: "error",
          message: "Task Name already exists",
        })
      );
    }
  };
  const handleCancel = () => {
    navigate("/viewTasks");
    setFormData(defaultData);
  };
  return (
    <div
      style={{
        display: "grid",
        gap: "30px",
        margin: "20px",
        border: "1px solid #eee",
        borderRadius: "4px",
        padding: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <TextField
          required
          fullWidth
          name="taskname"
          label="Task Name"
          id="outlined-size-small"
          size="small"
          value={formData.taskname}
          defaultValue={formData.taskname}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          required
          fullWidth
          name="description"
          label="Description"
          id="outlined-size-normal"
          size="small"
          value={formData.description}
          defaultValue={formData.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          marginRight: "10px",
        }}
      >
        <TimeField
          fullWidth
          id="outlined-size-normal"
          size="small"
          name="startTime"
          label={"Start Time"}
          value={formData.startTime}
          onChange={(value) => handleDateChange(value, "startTime")}
        />
        <TimeField
          fullWidth
          id="outlined-size-normal"
          size="small"
          name="endTime"
          label={"End Time"}
          value={formData.endTime}
          minDate={formData.startTime}
          onChange={(value) => handleDateChange(value, "endTime")}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          onClick={handleSave}
          disabled={disabled}
        >
          {isMode === "edit" ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  );
};

export default EditTask;
