const list = document.querySelector("");


export const fetchTasks = async () => {
    const response = await fetch("/getCodes");

    const tasks = await response.json();

    console.log(tasks);
};

export const HTMLfunc = () => {

}