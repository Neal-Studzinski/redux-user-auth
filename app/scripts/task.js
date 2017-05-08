import moment from 'moment';

export default function ( store ) {

    var name = store.getState().name;

    let $html = $(`
        <section class="task-view">
            <h2>
            Hi, ${name}! Thank you for logging in. Here are your tasks.
            </h2>
            <form id="submit_task" action="" method="post">
                <table>
                    <thead>
                        <tr>
                        <th></th>
                        <th>name</th>
                        <th>description</th>
                        <th>complete</th>
                        <th>important</th>
                        <th>due date</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </form>
        </section>
  `);

  let $formInputs = $(`
      <tr>
        <td><button type="submit" value="add new task">add new task</button></td>
        <td><input id="name" placeholder="name" value=""/></td>
        <td><input id="description" placeholder="description" value=""/></td>
        <td><input id="state" type="checkbox" /></td>
        <td><input id="important" type="checkbox" /></td>
        <td><input id="due_date" placeholder="01/01/2001 1:00pm" value=""/></td>
      </tr>
  `);

  $html.find('#submit_task').on('submit', (event) => {
      event.preventDefault();
      var name = event.target.elements.name.value;
      var description = event.target.elements.description.value;
      var state = event.target.elements.state.checked;
      var important = event.target.elements.important.checked;
      var due_date = event.target.elements.due_date.value;
      
      store.dispatch( {type: "NEW_TASK",
                        name: name,
                        description: description,
                        state: state,
                        important: important,
                        due_date: due_date
                    });
    });

  console.log('Store: ', store.getState());

  var $tbody = $html.find('tbody');
  $tbody.append($formInputs);

  var tasks = store.getState().tasks
  tasks.forEach(function(task, index, array) {
    $tbody.append($(`
        <tr>
          <td></td>
          <td>${task.name}</td>
          <td>${task.description}</td>
          <td>${task.state}</td>
          <td>${task.important}</td>
          <td>${moment(task.due_date).format("ddd, MMM Do YY, h:mm")}</td>
        </tr>
      `));
  })


  return $html;
}
