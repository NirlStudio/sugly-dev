################################################################################
# external the-value, other-values, the-type, other-types
($the-value ?? (warn "the-value is missing.").
(($the-value is-a the-type) ? (warn "the-value does not match with the-type.").
(($other-values is-an array) ? (warn "other-values should be an array").
(($other-types is-an array) ? (warn "other-types should be an array").
################################################################################
(define "Identity" (=> ()
  (should "A value is always itself." (=> ()
    (assert ($the-value is the-value).
    (assert false ($the-value is-not the-value).
  ).
  (should "A value is not any one of types." (=> ()
    (assert false ($the-value is type).
    (assert ($the-value is-not type).

    (assert false ($the-value is the-type).
    (assert ($the-value is-not the-type).

    (for a-type in other-types
      (assert false ($the-value is (a-type the-type).
      (assert ($the-value is-not (a-type the-type).
    ).
  ).
  (should "A value is not any one of other values." (=> ()
    (assert false ($the-value is).
    (assert ($the-value is-not).

    (assert false ($the-value is null).
    (assert ($the-value is-not null).

    (for a-value in other-values
      (assert false ($the-value is a-value).
      (assert ($the-value is-not a-value).
    ).

    (for a-type in other-types
      (for a-value in ((a-type values) concat (a-type "empty"))
        (assert false ($the-value is a-value).
        (assert ($the-value is-not a-value).
      ).
    ).
  ).
).

(define "Identity Operators" (=> ()
  (should "'===' equals 'is'." (=> ()
    (assert ($($the-value "===") is ($the-value "is").
  ).
  (should "'!==' equals 'is-not'." (=> ()
    (assert ($($the-value "!==") is ($the-value "is-not").
  ).
).

(define "Equivalence" (=> ()
  (should "a value equals with itself." (=> ()
    (assert ($the-value equals the-value).
    (assert false ($the-value not-equals the-value).
  ).
  # a value may be equivalent with another value of the same type.
  (should "A value does not equal any one of types." (=> ()
    (assert false ($the-value equals type).
    (assert ($the-value not-equals type).

    (assert false ($the-value equals the-type).
    (assert ($the-value not-equals the-type).

    (for a-type in other-types
      (assert false ($the-value equals (a-type the-type).
      (assert ($the-value not-equals (a-type the-type).
    ).
  ).
  (should "a value does not equal with any value of other types." (=> ()
    (for a-type in other-types
      (for a-value in ((a-type values) concat (a-type "empty"))
        (assert false ($the-value equals a-value).
        (assert ($the-value not-equals a-value).
      ).
    ).
  ).
).

(define "Equivalence Operators" (=> ()
  (should "'==' is 'equals'." (= ()
    (assert ($($the-value "==") is ($the-value "equals").
  ).
  (should "'!=' is 'not-equals'." (= ()
    (assert ($($the-value "!=") is ($the-value "not-equals").
  ).
).

(define "Ordering" (=> ()
  (should "A value is at least comparable with itself." (=> ()
    (assert 0 ($the-value compares-to the-value).
  ).
  # a value may be comparable with values of the same type.
  (should "A value is not comparable with any one of types." (=> ()
    (assert null ($the-value compares-to type).
    (assert null ($the-value compares-to the-type).
    (for a-type in other-types
      (assert null ($the-value compares-to (a-type the-type).
    ).
  ).
  (should "a value is not comparable with any value of other types." (=> ()
    (for a-type in other-types
      (for a-value in ((a-type values) concat (a-type "empty"))
        (assert null ($the-value compares-to a-value).
      ).
    ).
  ).
).

(define "Type Verification" (=> ()
  (should "a value's type is the type." (=> ()
    (assert ($the-value is-a the-type).
    (assert false ($the-value is-not-a the-type).

    (assert (($the-value type) is the-type).
    (assert false (($the-value type) is-not the-type).
  ).
  (should "a value's type is not any other type." (=> ()
    (for a-type in other-types
      (if ((the-type is-not-a class) && (a-type is-not object))
        (assert false ($the-value is-a (a-type the-type).
        (assert ($the-value is-not-a (a-type the-type).

        (assert false (($the-value type) is (a-type the-type).
        (assert (($the-value type) is-not (a-type the-type).
    ).
  ).
).

(define "Emptiness" (=> ()
  (should "(the-value is-empty) returns a boolean value." (=> ()
    (assert (($the-value is-empty) is-a bool).
  ).
  (should "(the-value not-empty) returns a boolean value." (=> ()
    (assert (($the-value not-empty) is-a bool).
  ).
  (should "(the-value is-empty) returns an opposite value with (the-value not-empty)." (=> ()
    (assert (($the-value is-empty) is-not ($the-value not-empty).
  ).
).

(define "Encoding" (=> ()
  (should "(the-value to-code) returns an atom value." (=> ()
    (assert (tuple accepts ($the-value to-code).
  ).
).

(define "Description" (=> ()
  (should "(the-value to-string) returns a string." (=> ()
    (assert (($the-value to-string) is-a string).
  ).
).

(define "Indexer" (=> ()
  (should "A value's indexer is a lambda." (=> ()
    (assert ($($the-value ":") is-a lambda).
    (assert ($($the-value ":") equals ($the-empty ":").
  ).
).

(define "Evaluation" (=> ()
  (should "a value may be evaluated to itself." (=> ()
    (assert the-value ($the-value).
  ).
).

(if (the-type is-not number) (define "Arithmetic Operators for non-number" (=> ()
  (should "(++ the-value) returns 1." (=> ()
    (var x the-value)
    (assert 1 (++ x).
    (assert 1 x).
  ).
  (should "(-- the-value) returns -1." (=> ()
    (var x the-value)
    (assert -1 (-- x).
    (assert -1 x).
  ).
).

(if (the-type is-not number) (define "Bitwise Operators for non-number" (=> ()
  (should "(~ the-value) returns (~ 0)." (=> ()
    (assert (~ 0) (~ the-value).
    (var x the-value)
    (assert (~ 0) (~ x).
  ).
).

(if (the-type is-not number) (define "General Operators for non-number" (=> ()
  (should "(+ the-value) convert the value to a string." (=> ()
    (var str (($the-value is-a string) ? the-value ($the-value to-string).
    (assert str (+ the-value).
    (assert (+ str str) (+ the-value the-value).

    (var x the-value)
    (assert str (+ x).
    (assert (+ str str) (+ x x).
  ).
).

(define "Logical Operators" (=> ()
  (var mod ($the-value is false:: or ($the-value == 0):: ? "./false" "./true").
  (load mod (@:@ the-value).
).

(define "Global Operators" (=> ()
  (if ($the-value is-empty) (define "Emptiness Test: (the-empty-value ?* ...)" (=> ()
    (should "Booleanize: (the-value ?*) returns false." (=> ()
      (assert false ($the-value ?*).
      (var x the-value)
      (assert false ($x ?*).
    ).
    (should "Emptiness Fallback: (the-value ?* x) returns x." (=> ()
      (assert 1 ($the-value ?* 1).
      (assert 1 ($the-value ?* (1).
      (var x the-value)
      (assert 1 ($x ?* 1).
      (assert 1 ($x ?* (1).
    ).
    (should "Emptiness Switch: (the-value ?* x y) returns y." (=> ()
      (var x -1)
      (var y  1)
      (assert 2 ($the-value ?* x (++ y).
      (assert 2 y)

      (assert 3 ($the-value ?* (-- x) (++ y).
      (assert -1 x)
      (assert 3 y)
    ).
  ).
  (if ($the-value not-empty) (define "Emptiness Test: (the-non-empty-value ?* ...)" (=> ()
    (should "Booleanize: (the-value ?*) returns true." (=> ()
      (assert true ($the-value ?*).
      (var x the-value)
      (assert true ($x ?*).
    ).
    (should "Emptiness Fallback: (the-value ?* x) returns the-value." (=> ()
      (assert the-value ($the-value ?* 1).
      (assert the-value ($the-value ?* (1).
      (var x the-value)
      (assert the-value ($x ?* 1).
      (assert the-value ($x ?* (1).
    ).
    (should "Emptiness Switch: (the-value ?* x y) returns x." (=> ()
      (var x -1)
      (var y  1)
      (assert -1 ($the-value ?* x (++ y).
      (assert 1 y)

      (assert -2 ($the-value ?* (-- x) (++ y).
      (assert -2 x)
      (assert 1 y)
    ).
  ).
  (define "Null Test: (the-value ?? ...)", (=> ()
    (define "Booleanize Null: (the-value ??)" (=> ()
      (should "(the-value ??) returns true." (=> ()
        (assert true ($the-value ??).

        (var v the-value)
        (assert true ($v ??).
      ).
    ).
    (define "Null fallback: (the-value ?? value)" (=> ()
      (should "(the-value ?? value) returns the-value." (=> ()
        (var c 0)
        (assert the-value ($the-value ?? 1).
        (assert the-value ($the-value ?? (++ c).
        (assert 0 c)

        (var v the-value)
        (assert the-value ($v ?? 1).
        (assert the-value ($v ?? (++ c).
        (assert 0 c)
      ).
    ).
    (define "Null Switch: (the-value ?? truthy, falsy)" (=> ()
      (should "(the-value ?? truthy, falsy) returns truthy." (=> ()
        (let x 1)
        (let y -1)
        (assert 1 ($the-value ?? x y).
        (assert 2 ($the-value ?? (++ x) (-- y).
        (assert 2 x)
        (assert -1 y)
      ).
    ).
  ).
).
