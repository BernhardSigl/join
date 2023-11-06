function generateAddTaskContentHTML() {
    return /*html*/`
    <section class="alignCenter gap30 title">
            <span class="fontSize61 bold">
                Add task
            </span>
        </section>

        <div class="dFlex gap48">
            <div class="leftContainer column gap32">
                <!-- title -->
                <section class="column gap8">
                    <span class="fontSize20">
                        Title
                        <span class="red">*</span>
                    </span>
                    <input type="text" class="input1216 inputField pointer fontSize20" placeholder="Enter a title">
                </section>
                <!-- description -->
                <section class="column gap8">
                    <span class="fontSize20">
                        Description
                    </span>
                    <textarea type="text" class="input1216 inputField inputDescription pointer fontSize20"
                        placeholder="Enter a description"></textarea>
                </section>
                <!-- assigned to -->
                <section class="column gap8">
                    <span class="fontSize20">
                        Assigned to
                    </span>
                    <div class="relative dropdown">
                        <input class="input1216 inputField fontSize20 pointer" placeholder="Select contacts to assign">
                        <img src="img/drowndown.png" class="symbol24InputHover pointer">
                        <div class="dropdownContent" id="assignToId">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </section>
            </div>

            <div class="greyline">
            </div>

            <div class="rightContainer column gap32">
                <!-- due date -->
                <section class="column gap8">
                    <span class="fontSize20">
                        Due date
                        <span class="red">*</span>
                    </span>
                    <div class="relative" onclick="datePicker()">
                        <input type="text" class="input1216 inputField pointer fontSize20" placeholder="dd/mm/yyyy"
                            id="datepickerId">
                        <img src="img/event.png" class="symbol24InputHover pointer">
                    </div>
                </section>
                <!-- prio buttons -->
                <section class="column gap8">
                    <span class="fontSize20 alignCenter">
                        <span>
                            Prio
                        </span>
                    </span>
                    <div class="dFlex gap16">
                        <button class="prioBtn horizontalAndVertical">
                            <span class="fontSize20 pointer">
                                Urgent
                            </span>
                            <object class="symbol20" type="image/svg+xml" data="img/urgentPrio.svg">
                            </object>
                        </button>
                        <button class="prioBtn horizontalAndVertical">
                            <span class="fontSize20 pointer">
                                Medium
                            </span>
                            <object class="symbol20" type="image/svg+xml" data="img/mediumPrio.svg">
                            </object>
                        </button>
                        <button class="prioBtn horizontalAndVertical">
                            <span class="fontSize20 pointer">
                                Low
                            </span>
                            <object class="symbol20" type="image/svg+xml" data="img/lowPrio.svg">
                            </object>
                        </button>
                    </div>
                </section>
                <!-- category -->
                <section class="column gap8">
                    <span class="fontSize20">
                        Category
                        <span class="red">*</span>
                    </span>
                    <div class="relative dropdown">
                        <input class="input1216 inputField fontSize20 pointer" placeholder="Select task category">
                        <img src="img/drowndown.png" class="symbol24InputHover pointer">
                        <div class="dropdownContent" id="selectCategoryId">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </section>
                <!-- subtasks -->
                <section class="column gap8">
                    <span class="fontSize20">
                        Subtasks
                    </span>
                    <div class="relative">
                        <input class="input1216 inputField fontSize20 pointer" placeholder="Select task category">
                        <img src="img/plus.png" class="symbol24InputHover pointer">
                    </div>
                </section>
            </div>
            <!-- footer -->
            <div class="footer spaceBetween">
                <div class="leftFooter">
                    <span class="fontSize20">
                        <span class="red">*</span>
                        This field is required
                    </span>
                </div>
                <div class="rightFooter dFlex gap16">
                    <button class="btn1616 btnWhite alignCenter dFlex  pointer changeCrossImage">
                        <span class="fontSize20 pointer">
                            Clear
                        </span>
                        <img src="img/cross.png" class="symbol24">
                    </button>
                    <button class="btn1616 alignCenter dFlex pointer">
                        <span class="fontSize20 fontWhite pointer">
                            Create Task
                        </span>
                        <img src="img/hookWhiteSmall.png" class="symbol24">
                    </button>
                </div>
            </div>
        </div>
    </section>
    <img src="img/cross.png" class="closePopup dNone" id="closePopupId"onclick="slideOutTwoObjects('addTaskPopupId', 'backgroundAddTaskPopupId')">`
}