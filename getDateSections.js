import moment from 'moment'

const getTitleByDate = (date) => {
    const convertdate = moment(date).calendar()
    const newDate = convertdate.split(" at ");
    if (newDate[0] == 'Today') {
        return newDate[0]
    } else {
        return moment(date).format('L');
    }

}

const getDateSections = (data, key = "transactionDate") => {
    let arrayTitleDate = []
    const newData = data.map(obj => {
        arrayTitleDate.push(getTitleByDate(obj[key]))
        return {
            data: [obj],
            title: getTitleByDate(obj[key])
        }
    })

    const uniqArrayTitleDate = Array.from(new Set(arrayTitleDate))

    const groupingArrayByTitle = (newData, uniqDate) => {
        let tempArray = []
        newData.map(obj => {
            if (obj.title == uniqDate) {
                tempArray.push(obj.data[0])
            }
        })
        return tempArray
    }

    const sections = uniqArrayTitleDate.map(uniqDate => {
        const getArrayData = groupingArrayByTitle(newData, uniqDate)
        return {
            data: getArrayData,
            title: uniqDate
        }

    })
    return sections
}

export default getDateSections