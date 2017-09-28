import getTestFiles, { isValidTestFile } from 'utils/getTestFiles'

const testFiles = getTestFiles()

testFiles
.keys()
.filter(isValidTestFile)
.forEach(testFiles)
