import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ToDo = ({ toDo, markDone, setUpdateData, deleteTask }) => {
  return (
    <>
      {toDo && Array.isArray(toDo) && // pengecekan bahwa toDo adalah array
        toDo
          .sort((a, b) => a.id > b.id ? 1 : -1)
          .map((task, index) => {
            const isCompleted = task.status;
            const doneIcon = isCompleted ? faTimesCircle : faCircleCheck;
            const doneIconTitle = isCompleted ? 'Not Completed' : 'Completed';

            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? 'done' : ''}>
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                  </div>
                  <div className="iconsWrap">
                    <span
                      title={doneIconTitle}
                      onClick={(e) => markDone(task.id)}
                    >
                      <FontAwesomeIcon icon={doneIcon} />
                    </span>

                    {!task.status && ( // pengecekan bahwa task.status adalah false
                      <span
                        title="Edit"
                        onClick={() => setUpdateData(task)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}

                    <span title="Delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </>
  );
};

export default ToDo;
