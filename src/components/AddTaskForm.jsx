const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
  return (
    <>
      {/* Add Task */}
      <div className="row add-task-row">
        <div className="col">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="form-control form-control-lg add-task-input"
            placeholder="Enter task..."
          />
        </div>
        <div className="col-auto">
          <button onClick={addTask} className="btn btn-lg btn-success add-task-button">
            <i className="fas fa-plus"></i> Add Task
          </button>
        </div>
      </div>
      <br />
    </>
  );
};

export default AddTaskForm;