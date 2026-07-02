const tasks = Array.from({ length: 300000 }, (_, i) => () => {
  const div = document.createElement('div')
  div.innerText = i
  document.body.appendChild(div)
})

const btn = document.querySelector('.btn')
btn.onclick = () => {
  // const scheduler = (chunkTask) => {
  //   setTimeout(() => {
  //     const now = performance.now()
  //     chunkTask(() => performance.now() - now < 1)
  //   }, 1000)
  // }
  // performTasks(tasks, scheduler)
  idlePerformTasks(tasks)
}

/**
 * 分时任务函数，什么时机执行，每次执行多少任务/每次花多少时间执行任务
 * @param {*} tasks 
 * @param {*} scheduler 
 * @returns 
 * 什么时机执行，例如requestIdleCallback、setTimeout、requestAnimationFrame等
 * 每次执行多少任务/每次花多少时间执行任务，例如() => deadline.timeRemaining() > 0
 */
function performTasks(tasks, scheduler) {
  if (tasks.length === 0) return
  let i = 0
  // 每一次的执行
  function _run() {
    scheduler((goon) => {
      while(i < tasks.length && goon()) {
        tasks[i++]()
      }
      _run()
    })
  }
  _run()
}

function idlePerformTasks(tasks) {
  const scheduler = (chunkTask) => {
    requestIdleCallback((deadline) =>  {
      chunkTask(() => deadline.timeRemaining() > 0)
    })
  }
  performTasks(tasks, scheduler)
}
