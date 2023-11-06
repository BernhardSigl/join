
let datePickerExecuted;

function addTaskInit() {
    datePickerExecuted = false;
    datePicker();
}

function datePicker() {
    if (!datePickerExecuted) {
        let dateInput = document.getElementById('datepicker');
        new Pikaday({
            field: dateInput,
            position: 'top right',
            format: 'DD/MM/YYYY',
            onSelect: function (date) {
                const formattedDate = [
                    date.getDate().toString().padStart(2, '0'),
                    (date.getMonth() + 1).toString().padStart(2, '0'),
                    date.getFullYear()
                ].join('/');
                dateInput.value = formattedDate;
            }
        });
        datePickerExecuted = true;
    }
};