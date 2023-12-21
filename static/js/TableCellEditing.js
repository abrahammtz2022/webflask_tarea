export default class TableCellEditing {
    constructor(table) {
        this.tbody = table.querySelector('tbody');
    }


    init() {
        const tds = this.tbody.querySelectorAll('td');
        tds.forEach(td => {
            td.setAttribute('contenteditable', true);

            td.addEventListener('click', (ev) => {
                if (!this.inEditing(td)) {
                    this.startEditing(td);
                }
            });
        });
    }


    startEditing(td) {
        const activeId = this.findEditing()
        if (activeId) {
            this.cancelEditing(activeId);
        }
        td.className = 'in-editing';
        td.setAttribute('data-old-value', td.innerHTML);
        this.createButtonToolbar(td);
    }

    cancelEditing(td) {
        td.innerHTML = td.getAttribute('data-old-value');
        td.classList.remove('in-editing');
        //this.removeToolbar(td);
    }

    finishEditing(td) {
        td.classList.remove('in-editing');
        this.removeToolbar(td);
    }
    inEditing(td) {
        return td.classList.contains('in-editing');
    }
    createButtonToolbar(td) {
        const toolbar = document.createElement('div');
        toolbar.className = 'button-toolbar';
        toolbar.setAttribute('contenteditable', false);

        toolbar.innerHTML = `
	<div class="button-wrapper">
		<button class="btn btn-sm btn-danger btn-cancel">Cancel</button>
		<button class="btn btn-sm btn-primary btn-save">Save</button>
	</div>
	`
        td.appendChild(toolbar);

        const btnSave = toolbar.querySelector('.btn-save');
        const btnCancel = toolbar.querySelector('.btn-cancel');
        btnSave.addEventListener('click', (ev) => {
            ev.stopPropagation();
            this.finishEditing(td);
        });
        btnCancel.addEventListener('click', (ev) => {
            ev.stopPropagation();
            this.cancelEditing(td);
        });
    }
    removeToolbar(td) {
        const toolbar = td.querySelector('.button-toolbar');
        toolbar.remove();
    }
    findEditing(td) {
        return Array.prototype.find.call(this.tds, td => this.inEditing(td))
    }

}