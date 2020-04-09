/** Класс для вывода входных данных в табличном виде. */
class GridView {
	/**
	 * @param {array} _tableClass - css классы оформления
	 * @param {array} data - входные данные
	 * @param {array} attribute - управляем тем,что выводим и как из входных данных
	 * @param {string} _element - куда выводить таблицу
	 * @param {string} _header - заголовок таблицы
	 * @param {object} _headerClass - css классы для заголовка
	 */

	constructor() {
		this._header = ''
		this._headerClass = []
		this._tableClass = []
		this._element = 'body'
		this.attribute = []
	}

	/**
	 * Устанавливает заголовок таблицы
	 * @param  {string} header Заголовок для таблицы
	 * @return {boolean} Установлен ли новый заголовок
	 */

	setHeader(header) {
		if (typeof header === 'string' && header.trim() != '') {
			this._header = header.trim()
			return true
		}
		return false
	}

	/**
	 * Записывает css классы для  заголовка
	 * @param  {array} headerClass Массив с названием классов для заголовка таблицы
	 * @return {boolean} Записаны ли новые css классы
	 */

	setHeaderClass(headerClass) {
		if (typeof headerClass === 'object') {
			this._headerClass = headerClass
			return true
		}
		return false
	}
	/**
	 * Записывает dom элемент, в который  будет выведена таблица
	 * @param  {string} element Dom элемент
	 * @return {boolean} Выведена ли таблица
	 */

	setElement(element) {
		if (document.querySelector(element)) {
			this._element = element
			return true
		}
		return false
	}

	render(data) {
		this.setElement(data.element)
		this.setHeaderClass(data.headerClass)
		this.setHeaderClass(data.headerClass)
		this.setHeader(data.header)
		this.data = data.data
		this.attribute = data.attribute

		// Отображение название таблицы
		if (this._header) {
			const header = document.createElement('h1')
			header.textContent = this._header
			this._headerClass.forEach(cssClass => header.classList.add(cssClass))
			document.querySelector(this._element).append(header)
		}
		//Создание таблицы
		const table = document.createElement('table')
		this._tableClass.forEach(cssClass => table.classList.add(cssClass))

		// Создание первой строчки в таблице(заголовки столбцов)
		let trHeader = document.createElement('tr')
		for (const key in this.attribute) {
			let th = document.createElement('th')
			if (this.attribute[key].label) th.textContent = this.attribute[key].label
			else th.textContent = key
			trHeader.append(th)
		}
		table.append(trHeader)

		// Заполнение таблицы данными
		for (const key in this.data) {
			let dataArr = this.data[key] // Один элемент из массива входных данных
			let tr = document.createElement('tr')
			for (const key2 in this.attribute) {
				let td = document.createElement('td')
				let value = dataArr[key2]

				// Проверяем есть ли функция value
				if (this.attribute[key2].value)
					value = this.attribute[key2].value(dataArr)

				// Проверяем есть ли атрибут src
				if (this.attribute[key2].src) td.innerHTML = value
				else td.textContent = value

				tr.append(td)
			}
			table.append(tr)
		}

		document.querySelector(this._element).append(table)
	}
}
