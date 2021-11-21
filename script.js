window.addEventListener('DOMContentLoaded', (event) => {
    
// I N I T I A L   S T U F F
    
	// Update time display
	
    setTimeDisplay()
    setInterval(function(){
        setTimeDisplay()
    }, 1000)   
	
	// Load local storaged activities
    
    loadActivities()
	loadEvents()
    isSofDay()
	cleanLocalHistory()
	checkEvents()
	setInterval(function(){
		checkEvents()
	}, 1000)
	
    
// T I M E   D I S P L A Y
    
    function setTimeDisplay(){
        const timeDisplayDate = new Date()
        
        // Local Time
        const timeDisplayDateYearLT     = timeDisplayDate.getFullYear()
        const timeDisplayDateMonthLT    = timeDisplayDate.getMonth()
        const timeDisplayDateDayLT      = timeDisplayDate.getDate()
        const timeDisplayDateHourLT     = timeDisplayDate.getHours()
        const timeDisplayDateMinuteLT   = timeDisplayDate.getMinutes()
        
        document.getElementById("year").innerHTML   = timeDisplayDateYearLT
		if(timeDisplayDateMonthLT < 10){
			document.getElementById("month").innerHTML  = `0${timeDisplayDateMonthLT}`
		} else {
			document.getElementById("month").innerHTML  = timeDisplayDateMonthLT 
		}
		if(timeDisplayDateDayLT < 10){
			document.getElementById("day").innerHTML    = `0${timeDisplayDateDayLT}`
		} else {
			document.getElementById("day").innerHTML    = timeDisplayDateDayLT 
		}
		if(timeDisplayDateHourLT < 10) {
			document.getElementById("hour").innerHTML   = `0${timeDisplayDateHourLT}:`
		} else {
			document.getElementById("hour").innerHTML   = `${timeDisplayDateHourLT}:`
		}
		if(timeDisplayDateMinuteLT < 10){
			document.getElementById("minute").innerHTML = `0${timeDisplayDateMinuteLT} LT`
		} else {
			document.getElementById("minute").innerHTML = `${timeDisplayDateMinuteLT} LT`
		}
        
        // UTC
        const timeDisplayDateYearUTC    = timeDisplayDate.getUTCFullYear()
        const timeDisplayDateMonthUTC   = timeDisplayDate.getUTCMonth()
        const timeDisplayDateDayUTC     = timeDisplayDate.getUTCDate()
        const timeDisplayDateHourUTC     = timeDisplayDate.getUTCHours()
        const timeDisplayDateMinuteUTC  = timeDisplayDate.getUTCMinutes()
        
        document.getElementById("UTCyear").innerHTML   = timeDisplayDateYearUTC 
        if(timeDisplayDateMonthUTC < 10){
			document.getElementById("UTCmonth").innerHTML  = `0${timeDisplayDateMonthUTC}`
		} else {
			document.getElementById("UTCmonth").innerHTML  = timeDisplayDateMonthUTC
		}
		if(timeDisplayDateDayUTC < 10){
			document.getElementById("UTCday").innerHTML    = `0${timeDisplayDateDayUTC}`
		} else {
			document.getElementById("UTCday").innerHTML    = timeDisplayDateDayUTC
		}
		if(timeDisplayDateHourUTC < 10) {
			document.getElementById("UTChour").innerHTML   = `0${timeDisplayDateHourUTC}:`
		} else {
			document.getElementById("UTChour").innerHTML   = `${timeDisplayDateHourUTC}:`
		}
		if(timeDisplayDateMinuteUTC < 10){
			document.getElementById("UTCminute").innerHTML = `0${timeDisplayDateMinuteUTC} UTC`
		} else {
			document.getElementById("UTCminute").innerHTML = `${timeDisplayDateMinuteUTC} UTC`
		}
    }
    
// L O A D   A C T I V I T I E S
    
    function loadActivities(){
        const currentLoadDate = new Date()
        const currentLoadDateDay = currentLoadDate.getDate()
		
		Object.keys(localStorage).sort().forEach(function(key){
			if(key.startsWith(`kosif_dashboard_new_activity_${currentLoadDateDay}`)){
				let storedActivityParameters = JSON.parse(localStorage.getItem(key))
				createNewActivity(storedActivityParameters[0], storedActivityParameters[1], storedActivityParameters[2], storedActivityParameters[3], storedActivityParameters[4])
                // 0 = Activity Number
                // 1 = Activity Name
                // 2 = Time From
                // 3 = Time To
                // 4 = LT/UTC
			}
		})
    }
	
// L O A D   E V E N T S
    
    function loadEvents(){
        const currentLoadDate = new Date()
        const currentLoadDateDay = currentLoadDate.getDate()
		
		Object.keys(localStorage).sort().forEach(function(key){
			if(key.startsWith(`kosif_dashboard_new_event_${currentLoadDateDay}`)){
				let storedEventParameters = JSON.parse(localStorage.getItem(key))
				createNewEvent(storedEventParameters[1], storedEventParameters[0], storedEventParameters[2], storedEventParameters[3])
			}
		})
        Object.keys(localStorage).sort().forEach(function(key){
			if(key.startsWith(`kosif_dashboard_new_event_check_${currentLoadDateDay}`)){
				let storedEventParameters = JSON.parse(localStorage.getItem(key))
                document.getElementById(storedEventParameters[0]).children[0].children[0].checked = storedEventParameters[1]

			}
		})
	}

// C L E A N   L O C A L   H I S T O R Y

    function cleanLocalHistory(){
        const historyDate = new Date()
        const historyDateDay = historyDate.getDate()

        Object.keys(localStorage).sort().forEach(function(key){
            if(key.startsWith(`kosif_dashboard_new_`)){
                const extractKeyDate = key.split("_") // need position 4
                if(extractKeyDate[4] != historyDateDay && extractKeyDate[4] != "check"){
                    localStorage.removeItem(key)
                }
            }
            if(key.startsWith(`kosif_dashboard_new_event_check_`)){
                const extractKeyDate = key.split("_") // need position 5
                if(extractKeyDate[5] != historyDateDay){
                    localStorage.removeItem(key)
                }
            }
        })
    }

// C H E C K   S O F   D A T E

    function isSofDay(){
        const sofDay = 4 // Sunday 0 Monday 1 Tuesday 2 Wednesday 3 Thursday 4 Friday 5 Saturday 6
        const currentDate = new Date()
        const currentDateDay = currentDate.getDay()
        
        if(sofDay == currentDateDay){
            createNewEvent("SOF", "1300", false, false) // checked = false, bind = false
        } else {
            console.log("it is not sof day me lads")
        }
    }
    
// C R E A T E   N E W   A C T I V I T Y
    
    function createNewActivity(activityNumber, activityName, activityFrom, activityTo, newActivityLocale) {
        const newActivityElement = document.createElement("div")
        newActivityElement.className = "activity"
        newActivityElement.id = `${activityNumber}_${activityName}`
        
        const newActivityElementTitle = document.createElement("div")
        newActivityElementTitle.className = "activityTitle"
        newActivityElementTitle.innerText = activityNumber
        
        const newActivityElementSubTitle = document.createElement("div")
        newActivityElementSubTitle.className = "activitySubTitle"
        newActivityElementSubTitle.innerText = activityName
        
        const newActivityElementTimes = document.createElement("div")
        newActivityElementTimes.className = "activityTimes"
        
        if(newActivityLocale == "lt"){
            const newActivityTimeCheck = new Date()
            const newActivityLocalTimeCheck = newActivityTimeCheck.getHours()
            const newActivityUTCCheck = newActivityTimeCheck.getUTCHours()
            const newActivityTimeCheckDifference = newActivityLocalTimeCheck - newActivityUTCCheck
            
            const newActivityElementTimesLT = document.createElement("div")
            newActivityElementTimesLT.className = "activityTimesInner"
            newActivityElementTimesLT.innerText = `${activityFrom} - ${activityTo} LT`
        
            const newActivityElementTimesUTC = document.createElement("div")
            newActivityElementTimesUTC.className = "activityTimesInner"
            
            let insertTimeFrom
            let insertTimeTo
            
            if(`${activityFrom.substring(0,2)-newActivityTimeCheckDifference}` < 10){
                insertTimeFrom = `0${activityFrom.substring(0,2)-newActivityTimeCheckDifference}${activityFrom.substring(2,4)}`
            } else {
                insertTimeFrom = `${activityFrom.substring(0,2)-newActivityTimeCheckDifference}${activityFrom.substring(2,4)}`
            }
            if(`${activityTo.substring(0,2)-newActivityTimeCheckDifference}` < 10){
                insertTimeTo = `0${activityTo.substring(0,2)-newActivityTimeCheckDifference}${activityTo.substring(2,4)}`
            } else {
                insertTimeTo = `${activityTo.substring(0,2)-newActivityTimeCheckDifference}${activityTo.substring(2,4)}`
            }
            
            newActivityElementTimesUTC.innerText = `${insertTimeFrom} - ${insertTimeTo} UTC`
            
            newActivityElementTimes.appendChild(newActivityElementTimesLT)
            newActivityElementTimes.appendChild(newActivityElementTimesUTC)
        } else if(newActivityLocale == "utc"){
            const newActivityTimeCheck = new Date()
            const newActivityLocalTimeCheck = newActivityTimeCheck.getHours()
            const newActivityUTCCheck = newActivityTimeCheck.getUTCHours()
            const newActivityTimeCheckDifference = newActivityLocalTimeCheck - newActivityUTCCheck
            
            const newActivityElementTimesLT = document.createElement("div")
            newActivityElementTimesLT.className = "activityTimesInner"
            newActivityElementTimesLT.innerText = `${parseInt(activityFrom.substring(0,2))+newActivityTimeCheckDifference}${activityFrom.substring(2,4)} - ${parseInt(activityTo.substring(0,2))+newActivityTimeCheckDifference}${activityTo.substring(2,4)} LT`
        
            const newActivityElementTimesUTC = document.createElement("div")
            newActivityElementTimesUTC.className = "activityTimesInner"
            newActivityElementTimesUTC.innerText = `${activityFrom} - ${activityTo} UTC`
            
            newActivityElementTimes.appendChild(newActivityElementTimesLT)
            newActivityElementTimes.appendChild(newActivityElementTimesUTC)
        }
        
        const newActivityElementDelete = document.createElement("div")
        newActivityElementDelete.className = "deleteActivity"
        newActivityElementDelete.id = `deleteActivity_${activityNumber}_${activityName}`
        newActivityElementDelete.innerHTML = '<i class="fas fa-trash-alt"></i>'
        newActivityElementDelete.title = `Delete Activity ${activityNumber} ${activityName}`
        
        const newActivityElementEdit = document.createElement("div")
        newActivityElementEdit.className = "editActivity"
        newActivityElementEdit.id = `editActivity_${activityNumber}_${activityName}`
        newActivityElementEdit.innerHTML = '<i class="fas fa-pencil-alt"></i>'
		newActivityElementEdit.title = `Edit Activity ${activityNumber} ${activityName}`
        
        newActivityElement.appendChild(newActivityElementTitle)
        newActivityElement.appendChild(newActivityElementSubTitle)
        newActivityElement.appendChild(newActivityElementTimes)
        newActivityElement.appendChild(newActivityElementDelete)
        newActivityElement.appendChild(newActivityElementEdit)
        
        document.getElementById("mainContainerActivities").appendChild(newActivityElement)    
    }
	
// C R E A T E   N E W   E V E N T

	function createNewEvent(newEventDetail, newEventTimeFrom, newEventChecked, bind){
		const eventCount = document.getElementById("eventContainer").childElementCount
		
		const newEventElement = document.createElement("div")
		newEventElement.className = "event"
		newEventElement.id = `eventNew_${eventCount}`
		
		const newEventElementForm = document.createElement("form")
		newEventElementForm.className = "eventForm"
		newEventElementForm.id = `form_eventNew_${eventCount}`
		
		const newEventElementFormInput = document.createElement("input")
		newEventElementFormInput.type = "checkbox"
		newEventElementFormInput.name = `eventNew_${eventCount}`
		newEventElementFormInput.checked = newEventChecked
		
		newEventElementForm.appendChild(newEventElementFormInput)
		
		const newEventElementTime = document.createElement("div")
		newEventElementTime.className = "eventTime"
		newEventElementTime.innerText = `${newEventTimeFrom} LT`
		
		const newEventElementText = document.createElement("div")
		newEventElementText.className = "eventText"
		newEventElementText.innerText = newEventDetail
		
		const newEventElementTools = document.createElement("div")
        newEventElementTools.className = "eventTools"
        
		newEventElement.appendChild(newEventElementForm)
		newEventElement.appendChild(newEventElementTime)
		newEventElement.appendChild(newEventElementText)
        
		if(!bind){
            const newEventElementDelete = document.createElement("div")
            newEventElementDelete.className = "deleteEvent"
            newEventElementDelete.id = `deleteEvent_${eventCount}`
            newEventElementDelete.innerHTML = '<i class="fas fa-trash-alt"></i>'
            newEventElementDelete.title = `Delete Event ${newEventDetail}`
            
            const newElementElementEdit = document.createElement("div")
            newElementElementEdit.className = "editEvent"
            newElementElementEdit.id = `editEvent_${eventCount}`
            newElementElementEdit.innerHTML = '<i class="fas fa-pencil-alt"></i>'
            newElementElementEdit.title = `Edit Event ${newEventDetail}`
            
            newEventElementTools.appendChild(newEventElementDelete)
            newEventElementTools.appendChild(newElementElementEdit)
            
            newEventElement.appendChild(newEventElementTools)
        } else {
            newEventElement.setAttribute("bind", "true")
        }
        if(newEventDetail != "SOF"){
            document.getElementById("eventContainer").appendChild(newEventElement)
        } else if(newEventDetail == "SOF"){
            document.getElementById("eventContainer").insertBefore(newEventElement, document.getElementById("eventContainer").children[5])
        }
	}
    
// E D I T   N E W   A C T I V I T Y
    
    function editActivity(activityNumber, activityName, activityFrom, activityTo, newActivityLocale) {
		const editActivityElement = document.createElement("div")
        editActivityElement.className = "activity"
        editActivityElement.id = `${activityNumber}_${activityName}`
        
        const editActivityElementTitle = document.createElement("div")
        editActivityElementTitle.className = "activityTitle"
        editActivityElementTitle.innerText = activityNumber
        
        const editActivityElementSubTitle = document.createElement("div")
        editActivityElementSubTitle.className = "activitySubTitle"
        editActivityElementSubTitle.innerText = activityName
        
        const editActivityElementTimes = document.createElement("div")
        editActivityElementTimes.className = "activityTimes"
        
        if(newActivityLocale == "lt"){
            const editActivityTimeCheck = new Date()
            const editActivityLocalTimeCheck = editActivityTimeCheck.getHours()
            const editActivityUTCCheck = editActivityTimeCheck.getUTCHours()
            const editActivityTimeCheckDifference = editActivityLocalTimeCheck - editActivityUTCCheck
            
            const editActivityElementTimesLT = document.createElement("div")
            editActivityElementTimesLT.className = "activityTimesInner"
            editActivityElementTimesLT.innerText = `${activityFrom} - ${activityTo} LT`
        
            const editActivityElementTimesUTC = document.createElement("div")
            editActivityElementTimesUTC.className = "activityTimesInner"
            editActivityElementTimesUTC.innerText = `${activityFrom.substring(0,2)-editActivityTimeCheckDifference}${activityFrom.substring(2,4)} - ${activityTo.substring(0,2)-editActivityTimeCheckDifference}${activityTo.substring(2,4)} UTC`
            
            editActivityElementTimes.appendChild(editActivityElementTimesLT)
            editActivityElementTimes.appendChild(editActivityElementTimesUTC)
        } else if(newActivityLocale == "utc"){
            const editActivityTimeCheck = new Date()
            const editActivityLocalTimeCheck = editActivityTimeCheck.getHours()
            const editActivityUTCCheck = editActivityTimeCheck.getUTCHours()
            const editActivityTimeCheckDifference = editActivityLocalTimeCheck - editActivityUTCCheck
            
            const editActivityElementTimesLT = document.createElement("div")
            editActivityElementTimesLT.className = "activityTimesInner"
            editActivityElementTimesLT.innerText = `${parseInt(activityFrom.substring(0,2))+editActivityTimeCheckDifference}${activityFrom.substring(2,4)} - ${parseInt(activityTo.substring(0,2))+editActivityTimeCheckDifference}${activityTo.substring(2,4)} LT`
        
            const editActivityElementTimesUTC = document.createElement("div")
            editActivityElementTimesUTC.className = "activityTimesInner"
            editActivityElementTimesUTC.innerText = `${activityFrom} - ${activityTo} UTC`
            
            editActivityElementTimes.appendChild(editActivityElementTimesLT)
            editActivityElementTimes.appendChild(editActivityElementTimesUTC)
        }
        const editActivityElementDelete = document.createElement("div")
        editActivityElementDelete.className = "deleteActivity"
        editActivityElementDelete.id = `deleteActivity_${activityNumber}_${activityName}`
        editActivityElementDelete.innerHTML = '<i class="fas fa-trash-alt"></i>'
        editActivityElementDelete.title = `Delete Activity ${activityNumber} ${activityName}`
		
        const editActivityElementEdit = document.createElement("div")
        editActivityElementEdit.className = "editActivity"
        editActivityElementEdit.id = `editActivity_${activityNumber}_${activityName}`
        editActivityElementEdit.innerHTML = '<i class="fas fa-pencil-alt"></i>'
		editActivityElementEdit.title = `Edit Activity ${activityNumber} ${activityName}`
        
        editActivityElement.appendChild(editActivityElementTitle)
        editActivityElement.appendChild(editActivityElementSubTitle)
        editActivityElement.appendChild(editActivityElementTimes)
        editActivityElement.appendChild(editActivityElementDelete)
        editActivityElement.appendChild(editActivityElementEdit)
        
        document.getElementById("mainContainerActivities").appendChild(editActivityElement) 
		document.getElementById("editActivityMenu").style.display = "none"
    }
    
// E D I T   E V E N T
    
    function editEvent(eventID, eventTime, eventText){
        document.getElementById(eventID).children[2].innerText = eventTime
        document.getElementById(eventID).children[3].innerText = eventText
        storeNewEvent(eventText, eventTime, false, false, null, eventID) // checked = false, bind = false, tools = true
        document.getElementById("editEventMenu").style.display = "none"        
    }
    
// S T O R E   N E W   A C T I V I T Y
    
    function storeNewActivity(newFiringNumber, newFiringText, activityFrom, activityTo, newActivityLocale) {
        const storeNewActivityDate = new Date()
        const storeNewActivityDateDay = storeNewActivityDate.getDate()

        localStorage.setItem(`kosif_dashboard_new_activity_${storeNewActivityDateDay}_${newFiringNumber}`, JSON.stringify([newFiringNumber, newFiringText, activityFrom, activityTo, newActivityLocale]))
    }
	
// S T O R E   N E W   E V E N T
    
    function storeNewEvent(newEventDetail, newEventTimeFrom, newEventChecked, bind, tools, id) {
        const storeNewEventDate = new Date()
        const storeNewEventDateDay = storeNewEventDate.getDate()
		const storeNewEventNumber = document.getElementById("eventContainer").childElementCount

        if(bind == null){
            localStorage.setItem(`kosif_dashboard_new_event_${storeNewEventDateDay}_${storeNewEventNumber}`, JSON.stringify([newEventTimeFrom, newEventDetail, newEventChecked, tools]))
        } else {
            localStorage.setItem(`kosif_dashboard_new_event_${storeNewEventDateDay}_${storeNewEventNumber}_${bind}`, JSON.stringify([newEventTimeFrom, newEventDetail, newEventChecked, tools]))
        }
    }
	
// U P D A T E   S T O R E D   A C T I V I T Y
	
	function storeEditActivity(newFiringNumber, newFiringText, activityFrom, activityTo, newActivityLocale, previousNumber, previousText) {
        const storeNewActivityDate = new Date()
        const storeNewActivityDateDay = storeNewActivityDate.getDate()
		
		localStorage.removeItem(`kosif_dashboard_new_activity_${storeNewActivityDateDay}_${previousNumber}`)
        localStorage.setItem(`kosif_dashboard_new_activity_${storeNewActivityDateDay}_${newFiringNumber}`, JSON.stringify([newFiringNumber, newFiringText, activityFrom, activityTo, newActivityLocale]))
    }
    
// U P D A T E   S T O R E D   E V E N T   C H E C K S T A T E

    function storeEditEventCheckstate(markedEventCurrentDay, markedEventTargetId, markedEventChecked){
        let eventDesignator
        
        if(markedEventTargetId == "eventOMS"){
            eventDesignator = 1
        } else if(markedEventTargetId == "eventEST"){
            eventDesignator = 2
        } else if(markedEventTargetId == "eventDABS1"){
            eventDesignator = 3
        } else if(markedEventTargetId == "eventDABS2"){
            eventDesignator = 4
        } else if(markedEventTargetId == "eventDABS3"){
            eventDesignator = 5
        } else {
            const extractEventDesignator = markedEventTargetId.split("_")
            eventDesignator = parseInt(extractEventDesignator[1])+1
        }
        localStorage.setItem(`kosif_dashboard_new_event_check_${markedEventCurrentDay}_${eventDesignator}`, JSON.stringify([markedEventTargetId, markedEventChecked]))
    }
	
// C H E C K   E V E N T S

	function checkEvents(){
		const checkEventCurrentDate = new Date()
		const checkEventCurrentHour = checkEventCurrentDate.getHours()
		const checkEventCurrentMinute = checkEventCurrentDate.getMinutes()
		const checkEventCurrentHoursToMinutes = checkEventCurrentHour*60
		const checkEventCurrentCombinedMinutes = checkEventCurrentHoursToMinutes + checkEventCurrentMinute
		
		const redBackground = "linear-gradient(to right, red, 80%, darkred)"
        const orangeBackground = "linear-gradient(to right, orange, 80%, red)"
        const yellowBackground = "linear-gradient(to right, yellow, 80%, orange)"
        const greenBackground = "linear-gradient(to right, lime, 80%, green)"
        const whiteBackground = "linear-gradient(to right, #f5f7fa, 80%, #c3cfe2)" // linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%)

		for(let i=1;i<document.getElementById("eventContainer").childElementCount;i++){
			let eventTimeHours = parseInt(document.getElementById("eventContainer").children[i].children[1].innerHTML.substring(0,2))
            if(isNaN(eventTimeHours)){
                eventTimeHours = parseInt(document.getElementById("eventContainer").children[i].children[2].innerHTML.substring(0,2))
            }
			const eventTimeHoursToMinutes = eventTimeHours*60
			let eventTimeMinutes = parseInt(document.getElementById("eventContainer").children[i].children[1].innerHTML.substring(2,4))
            if(isNaN(eventTimeMinutes)){
                eventTimeMinutes = parseInt(document.getElementById("eventContainer").children[i].children[2].innerHTML.substring(2,4))
            }
			const eventTimeCombinedMinutes = eventTimeHoursToMinutes+eventTimeMinutes
			if(!isNaN(eventTimeCombinedMinutes)){
                let checkCheck = document.getElementById("eventContainer").children[i].children[0].children[0].checked
                if(!checkCheck){
                    const eventTimeToCurrentTimeDifference = eventTimeCombinedMinutes - checkEventCurrentCombinedMinutes
                    if(eventTimeToCurrentTimeDifference > 30){
                        document.getElementById("eventContainer").children[i].style.backgroundImage = whiteBackground
                    }
                    if(eventTimeToCurrentTimeDifference < 31 && eventTimeToCurrentTimeDifference > 20){
                        document.getElementById("eventContainer").children[i].style.backgroundImage = yellowBackground
                        document.getElementById("eventContainer").children[i].style.color = "black"
                    }
                    if(eventTimeToCurrentTimeDifference < 21 && eventTimeToCurrentTimeDifference > 10){
                        document.getElementById("eventContainer").children[i].style.backgroundImage = orangeBackground
                        document.getElementById("eventContainer").children[i].style.color = "black"
                    }
                    if(eventTimeToCurrentTimeDifference < 11 && eventTimeToCurrentTimeDifference > 0){
                        document.getElementById("eventContainer").children[i].style.backgroundImage = redBackground
                        document.getElementById("eventContainer").children[i].style.color = "yellow"
                    }
                    if(eventTimeToCurrentTimeDifference <= 0){
                        document.getElementById("eventContainer").children[i].style.backgroundImage = redBackground
                        document.getElementById("eventContainer").children[i].style.color = "yellow"
                    }
                } else if(checkCheck){
                    document.getElementById("eventContainer").children[i].style.backgroundImage = greenBackground
                    document.getElementById("eventContainer").children[i].style.color = "black"
                }
			} 
		}
	}
    
// E V E N T   H A N D L E R S 
    
    // New Firing
    
    document.getElementById("newActivity").addEventListener("click", function(){
        document.getElementById("newActivityMenu").style.display = "flex"
        const newFiringInputFields = document.querySelectorAll(".newActivityMenuMainInput")
        for(let i=0;i<newFiringInputFields.length-1;i++){
            newFiringInputFields[i].value = ""
        }
    })
	
	// New Event
	
	document.getElementById("newEvent").addEventListener("click", function(){
        document.getElementById("createEventMenu").style.display = "flex"
        const createEventInputFields = document.querySelectorAll(".createEventMenuMainInput")
        for(let i=0;i<createEventInputFields.length;i++){
            createEventInputFields[i].value = ""
        }
    })
    
    // Edit Firing
    
    document.getElementById("mainContainerActivities").addEventListener("click", function(e){
        const editFiringDate = new Date()
        const editFiringDateDay = editFiringDate.getDate()
        
        if(e.target.parentNode.id.startsWith("editActivity")){
			const editFiringNumber   = document.getElementById("editActivityMenuMainDetailsFiringNumber")
			const removeFiringNumber = document.getElementById(e.target.parentNode.id.substring(13,99)).children[0].innerHTML // This is to ensure the old activity can be deleted when the Firing/Area designation changes
			const editFiringText     = document.getElementById("editActivityMenuMainDetailsFiringName")
			const removeFiringText	 = document.getElementById(e.target.parentNode.id.substring(13,99)).children[1].innerHTML // This is to ensure the old activity can be deleted when the Firing/Area designation changes
			const editAreaNumber     = document.getElementById("editActivityMenuMainDetailsAreaNumber")
			const editAreaText       = document.getElementById("editActivityMenuMainDetailsAreaName")
			const editactivityFrom   = document.getElementById("editActivityMenuMainTimesFrom")
			const editactivityTo     = document.getElementById("editActivityMenuMainTimesTo")
			const editActivityLocale = document.getElementById("editActivityMenuMainTimesLocale")
				
            document.getElementById("editActivityMenu").style.display = "flex"
            editactivityFrom.value = document.getElementById(e.target.parentNode.id.substring(13,99)).children[2].children[0].innerHTML.substring(0,4)
            editactivityTo.value = document.getElementById(e.target.parentNode.id.substring(13,99)).children[2].children[0].innerHTML.substring(7,11)
            editActivityLocale.value = document.getElementById(e.target.parentNode.id.substring(13,99)).children[2].children[0].innerHTML.substring(12,14).toLowerCase()
			if(document.getElementById(e.target.parentNode.id.substring(13,99)).children[0].innerHTML.match(/(^[0-9])\w+/)){
				editFiringNumber.value = document.getElementById(e.target.parentNode.id.substring(13,99)).children[0].innerHTML
				editFiringText.value = document.getElementById(e.target.parentNode.id.substring(13,99)).children[1].innerHTML
				document.getElementById("editActivityMenuMainButtonsCreate").addEventListener("click", function(){
					try{
                        document.getElementById("mainContainerActivities").removeChild(document.getElementById(`${removeFiringNumber}_${removeFiringText}`))
                        editActivity(editFiringNumber.value, editFiringText.value, editactivityFrom.value, editactivityTo.value, editActivityLocale.value)
                        storeEditActivity(editFiringNumber.value, editFiringText.value, editactivityFrom.value, editactivityTo.value, editActivityLocale.value, removeFiringNumber, removeFiringText)
                    } catch(err){
                        console.log(`${removeFiringNumber}_${removeFiringText}`)
                        console.log(err)
                    }
                    Object.keys(localStorage).sort().forEach(function(key){
                        if(key.startsWith(`kosif_dashboard_new_event_${editFiringDateDay}`)){
                            let storedActivityParameters = key.split("_")
                            if(storedActivityParameters[6]){
                                localStorage.removeItem(`kosif_dashboard_new_event_${editFiringDateDay}_${storedActivityParameters[5]}_${removeFiringNumber}`)
                                localStorage.setItem(`kosif_dashboard_new_event_${editFiringDateDay}_${storedActivityParameters[5]}_${editFiringNumber.value}`, JSON.stringify([editactivityFrom.value, editFiringText.value, false, true]))
                                console.log(`eventNew_${(parseInt(storedActivityParameters[5])-1)}`)
                                document.getElementById(`eventNew_${(parseInt(storedActivityParameters[5])-1)}`).children[1].innerHTML = `${editactivityFrom.value} LT`
                                document.getElementById(`eventNew_${(parseInt(storedActivityParameters[5])-1)}`).children[2].innerHTML = editFiringText.value
                            }
                        }
                    })
				})
			} else {
				editAreaNumber.value = document.getElementById(e.target.parentNode.id.substring(13,99)).children[0].innerHTML
				editAreaText.value = document.getElementById(e.target.parentNode.id.substring(13,99)).children[1].innerHTML
				document.getElementById("editActivityMenuMainButtonsCreate").addEventListener("click", function(){
                document.getElementById("mainContainerActivities").removeChild(document.getElementById(`${removeFiringNumber}_${removeFiringText}`))
                editActivity(editAreaNumber.value, editAreaText.value, editactivityFrom.value, editactivityTo.value, editActivityLocale.value)
                storeEditActivity(editAreaNumber.value, editAreaText.value, editactivityFrom.value, editactivityTo.value, editActivityLocale.value, removeFiringNumber, removeFiringText)
				})
			}
        }
    })
    
    // Create Firing
    
    document.getElementById("newActivityMenuMainButtonsCreate").addEventListener("click", function(){
        const newFiringNumber   = document.getElementById("newActivityMenuMainDetailsFiringNumber").value
        const newFiringText     = document.getElementById("newActivityMenuMainDetailsFiringName").value
        const newAreaNumber     = document.getElementById("newActivityMenuMainDetailsAreaNumber").value
        const newAreaText       = document.getElementById("newActivityMenuMainDetailsAreaName").value
        const activityFrom      = document.getElementById("newActivityMenuMainTimesFrom").value
        const activityTo        = document.getElementById("newActivityMenuMainTimesTo").value
        const newActivityLocale = document.getElementById("newActivityMenuMainTimesLocale").value
        
        if(newFiringNumber != ""){
            createNewActivity(newFiringNumber, newFiringText, activityFrom, activityTo, newActivityLocale) 
            storeNewActivity(newFiringNumber, newFiringText, activityFrom, activityTo, newActivityLocale)
            createNewEvent(newFiringText, activityFrom, false, true) // checked = false, bind = true
            storeNewEvent(newFiringText, activityFrom, false, newFiringNumber, true) // checked = false, bind = true
        }
        if(newAreaNumber != ""){
            createNewActivity(newAreaNumber, newAreaText, activityFrom, activityTo, newActivityLocale)   
            storeNewActivity(newAreaNumber, newAreaText, activityFrom, activityTo, newActivityLocale)
        }
        document.getElementById("newActivityMenu").style.display = "none"
    })
	
	// Create Event
    
    document.getElementById("createEventMenuMainButtonsCreate").addEventListener("click", function(){
        const newEventDetail	= document.getElementById("createEventMenuMainDetailsText").value
        const newEventTimeFrom  = document.getElementById("createEventMenuMainTimesFrom").value
		const newEventChecked = false
        
        createNewEvent(newEventDetail, newEventTimeFrom, newEventChecked, false) // bind = false
        storeNewEvent(newEventDetail, newEventTimeFrom, newEventChecked, false) // bind = false
		checkEvents()
        document.getElementById("createEventMenu").style.display = "none"
    })
    
    // Delete Firing
    
    document.getElementById("mainContainerActivities").addEventListener("click", function(e){
        const deleteActivityDate = new Date()
        const deleteActivityDateDay = deleteActivityDate.getDate()
        if(e.target.parentNode.id.startsWith("deleteActivity")){
            const deleteActivityNumber = document.getElementById(e.target.parentNode.id.substring(15,99)).children[0].innerHTML
            const deleteActivityName = document.getElementById(e.target.parentNode.id.substring(15,99)).children[1].innerHTML
            if(confirm(`Permanently delete \n \n "${deleteActivityNumber} ${deleteActivityName}"?`)){
                localStorage.removeItem(`kosif_dashboard_new_activity_${deleteActivityDateDay}_${deleteActivityNumber}`)
                document.getElementById("mainContainerActivities").removeChild(document.getElementById(`${deleteActivityNumber}_${deleteActivityName}`))
                Object.keys(localStorage).sort().forEach(function(key){
                    if(key.startsWith(`kosif_dashboard_new_event_${deleteActivityDateDay}`)){
                        let storedActivityParameters = key.split("_")
                        if(storedActivityParameters[6]){
                            localStorage.removeItem(`kosif_dashboard_new_event_${deleteActivityDateDay}_${storedActivityParameters[5]}_${deleteActivityNumber}`)
                            document.getElementById("eventContainer").removeChild(document.getElementById(`eventNew_${(storedActivityParameters[5]-1)}`))
                            try{
                                localStorage.removeItem(`kosif_dashboard_new_event_check_${deleteActivityDateDay}_${(parseInt(storedActivityParameters[5]))}`)
                            } catch(err){
                                console.log(err)
                            }
                        }
                    }
                })
            }
        }
    })
    
    // Delete Event
    
    document.getElementById("eventContainer").addEventListener("click", function(e){
        const deleteEventDate = new Date()
        const deleteEventDateDay = deleteEventDate.getDate()
        
        if(e.target.parentNode.id.startsWith("deleteEvent")){
            const deleteEvent = e.target.parentNode.parentNode.parentNode.id
            if(confirm(`Permanently delete Event: \n \n "${document.getElementById(deleteEvent).children[2].innerText}"?`)){
                localStorage.removeItem(`kosif_dashboard_new_event_${deleteEventDateDay}_${parseInt(deleteEvent.substring(9,99))+1}_false`)
                localStorage.removeItem(`kosif_dashboard_new_event_check_${deleteEventDateDay}_${parseInt(deleteEvent.substring(9,99))+1}`)
                document.getElementById("eventContainer").removeChild(document.getElementById(deleteEvent))
            }
        }
    })
    
    // Cancel New Firing
    
    document.getElementById("newActivityMenuMainButtonsCancel").addEventListener("click", function(){
        const newFiringInputFields = document.querySelectorAll(".newActivityMenuMainInput")
        for(let i=0;i<newFiringInputFields.length-1;i++){
            newFiringInputFields[i].value = ""
        }
        document.getElementById("newActivityMenu").style.display = "none"
    })
	
	// Cancel New Event
    
    document.getElementById("createEventMenuMainButtonsCancel").addEventListener("click", function(){
        const createEventInputFields = document.querySelectorAll(".createEventMenuMainInput")
        for(let i=0;i<createEventInputFields.length;i++){
            createEventInputFields[i].value = ""
        }
        document.getElementById("createEventMenu").style.display = "none"
    })
    
    // Cancel Edit Firing
    
    document.getElementById("editActivityMenuMainButtonsCancel").addEventListener("click", function(){
        const editFiringInputFields = document.querySelectorAll(".editActivityMenuMainInput")
        for(let i=0;i<editFiringInputFields.length;i++){
            editFiringInputFields[i].value = ""
        }
        document.getElementById("editActivityMenu").style.display = "none"
    })
    
    // Cancel Edit Event
    
    document.getElementById("editEventMenuMainButtonsCancel").addEventListener("click", function(){
        const editEventInputFields = document.querySelectorAll(".editEventMenuMainInput")
        for(let i=0;i<editEventInputFields.length;i++){
            editEventInputFields[i].value = ""
        }
        document.getElementById("editEventMenu").style.display = "none"
    })
    
    // Mark Event
    
    document.getElementById("eventContainer").addEventListener("click", function(e){
        
        const markedEventCurrentDate = new Date()
        const markedEventCurrentDay = markedEventCurrentDate.getDate()
        
        if(e.target.type == "checkbox"){
            const markedEventTargetId = e.target.parentNode.parentNode.id
            const markedEventChecked = e.target.checked
            console.log(markedEventTargetId)
            storeEditEventCheckstate(markedEventCurrentDay, markedEventTargetId, markedEventChecked)
            checkEvents()
        }
    })
    
    // Disable Inputs
    
    document.getElementById("newActivityMenuMainDetailsFiringNumber").addEventListener("blur", function(){
        if(document.getElementById("newActivityMenuMainDetailsFiringNumber").value){
            document.getElementById("newActivityMenuMainDetailsAreaNumber").disabled = true
            document.getElementById("newActivityMenuMainDetailsAreaName").disabled = true
        } else if(!document.getElementById("newActivityMenuMainDetailsFiringNumber").value){
            document.getElementById("newActivityMenuMainDetailsAreaNumber").disabled = false
            document.getElementById("newActivityMenuMainDetailsAreaName").disabled = false
        }
    })
    
    // Toggle Views
    
    const chapters =  [
        {tab: "firingTab", container: "mainContainerActivities", active: true, display: "grid"},
        {tab: "workInstructionsTab", container: "mainContainerWorkInstructions", active: false, display: "flex"},
    ]
        
    function toggleViews(){
        for(let i=0;i<Object.keys(chapters).length;i++){
            if(chapters[i].active){
                document.getElementById(chapters[i].container).style.display = chapters[i].display
            } else {
                document.getElementById(chapters[i].container).style.display = "none"
            }
        }
    }
        
    toggleViews()
        
    for(let i=0;i<Object.keys(chapters).length;i++){
        document.getElementById(chapters[i].tab).addEventListener("click", function(e){
            for(let j=0;j<Object.keys(chapters).length;j++){
                chapters[j].active = false
            }
            chapters[i].active = true
            toggleViews()
        })
    }
    
    // Edit Event
    
    document.getElementById("eventContainer").addEventListener("click", function(e){
        const editEventCurrentDate = new Date()
        const editEventCurrentDay = editEventCurrentDate.getDate()
		let toBeEditedEvent
        if(e.target.parentNode.id.startsWith("editEvent_")){
			toBeEditedEvent = e.target.parentNode.parentNode.parentNode.id
            console.log(toBeEditedEvent)
            document.getElementById("editEventMenu").style.display = "flex"

            const toBeEditedEventTime = document.getElementById(e.target.parentNode.parentNode.parentNode.id).children[1].innerText
            const toBeEditedEventText = document.getElementById(e.target.parentNode.parentNode.parentNode.id).children[2].innerText
            
            toBeEditedEventTimeSplit = toBeEditedEventTime.split(" ")
            document.getElementById("editEventMenuMainDetailsText").value = toBeEditedEventText
            document.getElementById("editEventMenuMainTimesFrom").value = toBeEditedEventTimeSplit[0]
			console.log(toBeEditedEvent)
        }
        document.getElementById("editEventMenuMainButtonsCreate").addEventListener("click", function(){
            console.log(toBeEditedEvent)
            document.getElementById(toBeEditedEvent).children[1].innerHTML = `${document.getElementById("editEventMenuMainTimesFrom").value} LT`
            document.getElementById(toBeEditedEvent).children[2].innerHTML = document.getElementById("editEventMenuMainDetailsText").value
            
            const eventId = toBeEditedEvent.split("_")
                
            localStorage.setItem(`kosif_dashboard_new_event_${editEventCurrentDay}_${parseInt(eventId[1])+1}_false`, JSON.stringify([document.getElementById("editEventMenuMainTimesFrom").value, document.getElementById("editEventMenuMainDetailsText").value, false, null]))
            document.getElementById("editEventMenu").style.display = "none"
        })
    })
	
	// Show DABS Today
	
	document.getElementById("dabsTodayTab").addEventListener("click", function(){
        window.open("https://www.skybriefing.com/o/dabs?today")
    })
	
	// Show DABS Tomorrow

    document.getElementById("dabsTomorrowTab").addEventListener("click", function(){
        window.open("https://www.skybriefing.com/o/dabs?tomorrow")
    })
	
	// Resize Event Container THIS IS NOT PRIORITY
    
    /*
	
	document.getElementById("eventContainer").addEventListener("mousemove", function(e){
		const target = e.target;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		if(x > -1 && x < 2){
			document.documentElement.style.cursor = "col-resize";
			document.getElementById("eventContainer").addEventListener("mouseleave", function(){
				document.documentElement.style.cursor = "default";
			})
		} else {
			document.documentElement.style.cursor = "default";
		}
	})
	
	document.getElementById("eventContainer").addEventListener("mousedown", function(e){
		const width = parseFloat(window.getComputedStyle(document.getElementById("eventContainer")).width)
		const target = e.target;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		if(x > -1 && x < 2){
			const initialClientX = e.clientX
			document.getElementById("mainContainer").addEventListener("mousemove", function(ev){
				console.log(initialClientX - ev.clientX)
				let newWidth = width + (initialClientX - ev.clientX) + "px"
				document.getElementById("eventContainer").style.width = newWidth
				
			})
		}
	})
	*/
    
// I N P U T   V A L I D A T I O N S

    const inputValidations = [ 
        "newActivityMenuMainDetailsFiringNumber",
        "newActivityMenuMainDetailsFiringName",
        "newActivityMenuMainDetailsAreaNumber",
        "newActivityMenuMainDetailsAreaName",
        "newActivityMenuMainTimesFrom",
        "newActivityMenuMainTimesTo",
        "editActivityMenuMainDetailsFiringNumber",
        "editActivityMenuMainDetailsFiringName",
        "editActivityMenuMainDetailsAreaNumber",
        "editActivityMenuMainDetailsAreaName",
        "editActivityMenuMainTimesFrom",
        "editActivityMenuMainTimesTo"
    ]

    for(let i=0;i<inputValidations.length;i++){
        document.getElementById(inputValidations[i]).addEventListener("blur", function(){
            switch(inputValidations[i]){
                case "newActivityMenuMainDetailsFiringNumber":
                    if(!document.getElementById(inputValidations[i]).value.match(/\b\d{4}\b/)){
                        document.getElementById(inputValidations[i]).style.color = "red"
                    } else {
                        document.getElementById(inputValidations[i]).style.color = "black"
                    }
                break;
                case "newActivityMenuMainDetailsAreaNumber":
                    if(!document.getElementById(inputValidations[i]).value.match(/[dDrRpP]{1}[- ]*\d{2}/)){
                        document.getElementById(inputValidations[i]).style.color = "red"
                    } else{
                        document.getElementById(inputValidations[i]).style.color = "black"
                    }
                break;
                case "newActivityMenuMainTimesFrom":
                    if(!document.getElementById(inputValidations[i]).value.match(/^(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/)){
                        document.getElementById(inputValidations[i]).style.color = "red"
                    } else{
                        document.getElementById(inputValidations[i]).style.color = "black"
                    }
                break;
                case "newActivityMenuMainTimesTo":
                    if(!document.getElementById(inputValidations[i]).value.match(/^(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/)){
                        document.getElementById(inputValidations[i]).style.color = "red"
                    } else{
                        document.getElementById(inputValidations[i]).style.color = "black"
                    }
                break;
            }
        })
    }

})
