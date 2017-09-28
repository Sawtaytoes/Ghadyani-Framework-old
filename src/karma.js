import getTestFiles, { isTapTestFile } from 'utils/getTestFiles'

const testFiles = getTestFiles()

testFiles
.keys()
.filter(isTapTestFile)
.forEach(testFiles)
