$(document).ready(function () {

    //GLOBAL VARIABLES
    
	const addTaskBtn = $("#newTaskBtn");
	const importListBtn = $("#importTaskBtn");
	const inputTask = $("#formControlLg");
	const inputImg = $("#formControlLgImg");
	const table = $("#taskTable");
    const searchBtn = $("#search");

    // FUNCTIONS

    const onTaskLoaded = (tasks) => {

        tasks.forEach(function(task) {
            let { taskName, taskDescription, status, startDate, dueDate, pictureUrl, email, assignedUser } = task;

            const rowElement = `<tr><td><div class="form-outline"><p class="editor">${taskName}</p></div></td>
                            <td><div class="form-outline"><p class="editor">${taskDescription}</p></div></td>
                            <td><span class="badge badge-success rounded-pill d-inline">${status}</span></td>
                            <td><input class="date" type="date" value="${startDate}" /></td>
                            <td><input class="date" type="date" value="${dueDate}" /></td>
                            <td><div class="d-flex align-items-center">
                                    <img
                                        src="${pictureUrl}"
                                        alt=""
                                        style="width: 45px; height: 45px; object-fit: cover"
                                        class="rounded-circle"
                                    />
                                    <div class="ms-3">
                                        <p class="fw-bold mb-1">${assignedUser}</p>
                                        <p class="text-muted mb-0">${email}</p>
                                    </div>
                                </div>
                            </td>
                            <td><button type="button" class="btn btn-success btn-sm btn-rounded">Edit</button></td>
                            <td><button type="button" class="btn btn-danger btn-sm btn-rounded">Remove</button></td>
                            </tr>`;
            table.append(rowElement);
        });
    };

	const addtask = () => {
		let newTask = inputTask.val();
        let imgSrc = inputImg.val();

		if (newTask === "") {
			alert("Please fill up a task!");
			return;
		};

        if (imgSrc === "") {
            imgSrc = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        };

		const newRowElement = `<tr><td><div class="form-outline"><p class="editor">${newTask}</p></div></td>
                            <td><div class="form-outline"><p class="editor">Add description...</p></div></td>
                            <td><span class="badge badge-success rounded-pill d-inline">Active</span></td>
                            <td><input class="date" type="date" /></td>
                            <td><input class="date" type="date" /></td>
                            <td><div class="d-flex align-items-center">
                                    <img
                                        src="${imgSrc}"
                                        alt=""
                                        style="width: 45px; height: 45px; object-fit: cover"
                                        class="rounded-circle"
                                    />
                                    <div class="ms-3">
                                        <p class="fw-bold mb-1">Insert your name here</p>
                                        <p class="text-muted mb-0">email@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td><button type="button" class="btn btn-success btn-sm btn-rounded">Edit</button></td>
                            <td><button type="button" class="btn btn-danger btn-sm btn-rounded">Remove</button></td>
                            </tr>`;

        table.prepend(newRowElement);
        inputTask.val("");
        inputImg.val("");
	};

    const onError = (jqXhr, textStatus, error) => {
        console.log('jqXhr: ', jqXhr);
        console.log('textStatus: ', textStatus);
        console.log('error: ', error);
    };

    const importTasks = () => {
        $.ajax({
            method: "GET",
            url: "tasklist.json",
            success: onTaskLoaded,
            error: onError
        });
    };

    function removeRow () {
        $(this).closest('tr').remove();
    };

    function editRow() {
        let editContent = 'contenteditable';
        let row = $(this).closest('tr');
        let para = $('p.editor');
        let name = row.find('.fw-bold');
        let email = row.find('.text-muted');
        row.find(para).prop(editContent, true).addClass('editable-text');
        name.prop(editContent, true).addClass('editable-text');
        email.prop(editContent, true).addClass('editable-text');
        $(this).text('Save');
        $(this).removeClass('btn-success').addClass('btn-primary');
      };

    function saveRow() {
        let editContent = 'contenteditable';
        let row = $(this).closest('tr');
        let para = $('p.editor');
        let name = row.find('.fw-bold');
        let email = row.find('.text-muted');
        row.find(para).prop(editContent, false).removeClass('editable-text');
        name.prop(editContent, false).removeClass('editable-text');
        email.prop(editContent, false).removeClass('editable-text');
        $(this).text('Edit');
        $(this).removeClass('btn-primary').addClass('btn-success');
    };

    const searchInTable = (keyword) => {
        $("#taskTable tbody tr").each(function () {
            const rowText = $(this).text().toLowerCase();
            if (rowText.includes(keyword.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    };

    //EVENT LISTENERS

    table.on('click', '.btn-danger', removeRow);
    table.on('click', '.btn-success', editRow);
    table.on('click', '.btn-primary', saveRow);

    importListBtn.on('click', function(e) {
        e.preventDefault();
        importTasks();
        importListBtn.prop('disabled', true);
    });

    addTaskBtn.on('click', function(e) {
        e.preventDefault();
        addtask();
    });

	searchBtn.click(function () {
        const keyword = $("#form1").val();
        searchInTable(keyword);
    });
});
