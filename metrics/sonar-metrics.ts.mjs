import fs from "fs"
import https from "https"

const base_url =
  "https://sonarcloud.io/api/measures/component_tree?component=fga-eps-mds_"
const file_name = "fga-eps-mds"
const metrics = [
  "files",
  "functions",
  "complexity",
  "comment_lines_density",
  "duplicated_lines_density",
  "coverage",
  "ncloc",
  "tests",
  "test_errors",
  "test_failures",
  "test_execution_time",
  "security_rating"
]

console.log(process.argv.slice(2))

const [repository, version] = process.argv.slice(2)

https
  .get(base_url + repository + `&metricKeys=${metrics.join(",")}`, (res) => {
    let data = ""
    res.on("data", (chunk) => {
      data += chunk
    })
    res.on("end", () => {
      const date = new Date()
      const formatedDate = `${
        date.getMonth() + 1
      }-${date.getDate()}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
      fs.writeFile(
        `${file_name}-${repository}-${formatedDate}-${version}.json`,
        data,
        function (err) {
          if (err) return console.log(err)
          console.log(err)
        }
      )

      return data
    })
  })
  .on("error", (err) => {
    console.log(err.message)
  })
