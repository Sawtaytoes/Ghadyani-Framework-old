/*
^((ok|not ok|(# (ok|tests|pass|fail)?))[ ]*)(.+)$

not ok 3 Test Name
ok 2 Test Name
# header Test Name
# tests 3
# pass 3
# fail 3
# ok
Should not work
#should not work


(\d+)[ ](.+)

1 1
3 should work
4 should work
23 should work
234 should work
should not work


^((\s{4}(operator|expected|actual):)|\s{6})[ ]*(.+)$

ok 1 <Sample /> component should exist
# Purposefully Failed Test 1
not ok 2 Math should equal
  ---
    operator: equal
    expected: 2
    actual:   1
  ...
not ok 3 Math should equal
  ---
    operator: equal
    expected: 3
    actual:   2
  ...
# Purposefully Failed Test 2
not ok 4 This should error!
  ---
    operator: error
    expected: undefined
    actual:   'This should error!'
  ...
# Purposefully Failed Test 3
not ok 5 <Sample /> component should exist
  ---
    operator: notOk
    expected: |-
      false
    actual: |-
      { $$typeof: Symbol(react.element), _owner: null, _store: {}, key: null, props: { children: [ { $$typeof: Symbol(react.element), _owner: null, _store: {}, key: null, props: { children: 'Sample' }, ref: null, type: 'h2' }, { $$typeof: Symbol(react.element), _owner: null, _store: {}, key: null, props: { children: 'This is a sample component.' }, ref: null, type: 'p' } ] }, ref: null, type: 'div' }
  ...
# Render <Sample />
ok 6 <Sample /> component should exist
ok 7 <Sample /> component should exist
*/
