function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC5) && f.$call$2(key, $.index(this._values, i));
  }
 },
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC5) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) return;
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) == null || $.index(this._keys, index) === $.CTC5) this._numberOfEntries = $.add(this._numberOfEntries, 1);
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || (oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || (oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t1 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
  for (var i = 0; i < capacity; ++i) {
    t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 == null || t2 === $.CTC5) continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t3 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t3);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t1 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t1, ({E: 'V'}));
      this._values = t1;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC5) continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._probeForAdding$1$bailout(2, numberOfProbes, hash, key, insertionIndex, t1);
    var t2 = t1.length;
    if (hash < 0 || hash >= t2) throw $.ioore(hash);
    t1 = t1[hash];
    if (t1 == null) {
      if (insertionIndex < 0) return hash;
      return insertionIndex;
    }
    if ($.eqB(t1, key)) return hash;
    if (insertionIndex < 0 && $.CTC5 === t1) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      numberOfProbes = env0;
      hash = env1;
      key = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            var t1 = this._keys;
          case 2:
            state = 0;
            var existingKey = $.index(t1, hash);
            if (existingKey == null) {
              if ($.ltB(insertionIndex, 0)) return hash;
              return insertionIndex;
            }
            if ($.eqB(existingKey, key)) return hash;
            if ($.ltB(insertionIndex, 0) && $.CTC5 === existingKey) insertionIndex = hash;
            var numberOfProbes0 = numberOfProbes + 1;
            hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
          case 3:
            state = 0;
            numberOfProbes = numberOfProbes0;
        }
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var result = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  $.forEach(this._backingMap, new $.HashSetImplementation_filter__(result, f));
  return result;
 },
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.HashSetImplementation_addAll__(this));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0)) throw $.iae(value);
  var t2 = t1.length;
  if (value < 0 || value >= t2) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$) break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    entry = t1[t2];
  } while ((entry == null || entry === $.CTC5));
 },
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$)) break;
    entry = $.index(t1, this._nextValidIndex);
  } while ((entry == null || entry === $.CTC5));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._nextValidIndex;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t2 = t1[t2];
  this._advance$0();
  return t2;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(2, t1, t2);
  var t3 = t2.length;
  if (t1 >= t3) return false;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
  t2[t1] === $.CTC5 && this._advance$0();
  t1 = this._nextValidIndex;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(3, t1, t2);
  return t1 < t2.length;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
    case 3:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._nextValidIndex;
    case 1:
      state = 0;
      var t2 = this._entries;
    case 2:
      state = 0;
      if ($.geB(t1, $.get$length(t2))) return false;
      $.index(t2, this._nextValidIndex) === $.CTC5 && this._advance$0();
      t1 = this._nextValidIndex;
    case 3:
      state = 0;
      return $.lt(t1, $.get$length(t2));
  }
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_lib0_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._lib0_list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  $.forEach(this._lib0_list, new $.LinkedHashMapImplementation_forEach__(f));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.index_1 = 0;
  $.forEach(this._lib0_list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_10 = 0;
  $.forEach(this._lib0_list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._lib0_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true) $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._lib0_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._lib0_list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_lib0_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._lib0_element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._lib0_element;
 },
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._lib0_element = e;
 }
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_lib0_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC8);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC8);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_lib0_element()) === true && other.addLast$1(entry.get$_lib0_element());
    entry = nextEntry;
  }
  return other;
 },
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_lib0_element());
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
 },
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
 },
 first$0: function() {
  return this._sentinel.get$_next().get$element();
 },
 get$first: function() { return new $.BoundClosure(this, 'first$0'); },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) return '';
  if ($.get$length(this._buffer) === 1) return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, str, t1);
  var t2 = $.get$length(str);
  if (typeof t2 !== 'number') return this.add$1$bailout(2, t1, t2);
  this._length = t1 + t2;
  return this;
 },
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true) return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t2 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t2);
      return this;
  }
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  if (!(this._next == null)) return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var next = this._next;
  this._next = null;
  return next;
 }
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  var value = (this.list[this.i]);
  this.i = this.i + 1;
  return value;
 },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
 }
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib1_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_index"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._index);
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      var actualParameters = sb.toString$0();
      sb = $.StringBufferImpl$('');
      for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      var formalParameters = sb.toString$0();
      t1 = this._functionName;
      return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
  }
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.PureMVC_Dart = {"":
 [],
 super: "Object",
 write$1: function(message) {
  var t1 = $.S($.document().query$1('#status').get$innerHTML()) + ' <br/> ' + $.S(message);
  $.document().query$1('#status').set$innerHTML(t1);
 },
 test$0: function() {
  var multitonKey = 'Test Core';
  var dataPoint1 = 'Hello';
  var dataPoint2 = 'World';
  var proxyName = 'DataProxy';
  var retrievedObject = null;
  var badJuju = '';
  try {
    var facade = $.MVCFacade_getInstance(multitonKey);
    this.write$1('Facade created for ' + $.S(multitonKey) + '.');
    var dataObject0 = $.ListFactory_List(null);
    $.setRuntimeTypeInfo(dataObject0, ({E: 'String'}));
    var dataObject = dataObject0;
    this.write$1('Data Object (List&ltString&gt) created.');
    $.add$1(dataObject, dataPoint1);
    this.write$1('Data point added \'' + $.S(dataPoint1) + '\'.');
    $.add$1(dataObject, dataPoint2);
    this.write$1('Data point added \'' + $.S(dataPoint2) + '\'.');
    var proxy = $.MVCProxy$(proxyName, dataObject);
    this.write$1('Proxy \'' + $.S(proxyName) + '\' created with for Data Object.');
    facade.registerProxy$1(proxy);
    this.write$1('Proxy \'' + $.S(proxyName) + '\' registered with Model, via Facade.');
    var retrievedProxy = facade.retrieveProxy$1(proxyName);
    this.write$1('Proxy \'' + $.S(proxyName) + '\' retrieved from Model, via Facade.');
    retrievedObject = retrievedProxy.getData$0();
    this.write$1('Data Object (List&ltString&gt) retrieved from ' + $.S(proxyName));
    this.write$1('Data Object (List&ltString&gt) Length: ' + $.S($.get$length(retrievedObject)));
    this.write$1('Contents: ' + $.S($.index(retrievedObject, 0)) + ' ' + $.S($.index(retrievedObject, 1)));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    badJuju = $.toString(e);
  } finally {
    if ($.eqB($.get$length(badJuju), 0) && !(retrievedObject == null) && $.eqB($.index(retrievedObject, 0), dataPoint1) && $.eqB($.index(retrievedObject, 1), dataPoint2)) this.write$1('<P/><B>Science!</B> PureMVC is purring like a kitten. Take her out for a spin!');
    else {
      this.write$1('<P/><B>Claptrap!</B> Someone\'s thrown a spanner in the works.');
      $.gtB($.get$length(badJuju), 0) && this.write$1('<B>Bad juju reported:</B> ' + $.S(badJuju));
    }
  }
 }
};

$$.FilteredElementList = {"":
 ["_childNodes", "_node"],
 super: "Object",
 last$0: function() {
  return $.last(this.get$_filtered());
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
 },
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
 },
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
 },
 get$length: function() {
  return $.get$length(this.get$_filtered());
 },
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
 },
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && result.remove$0();
  return result;
 },
 clear$0: function() {
  $.clear(this._childNodes);
 },
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.FilteredElementList_removeRange_anon());
 },
 addLast$1: function(value) {
  this.add$1(value);
 },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
 },
 add$1: function(value) {
  $.add$1(this._childNodes, value);
 },
 get$add: function() { return new $.BoundClosure0(this, 'add$1'); },
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len)) return;
  if ($.ltB(newLength, 0)) throw $.captureStackTrace($.CTC3);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
 },
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
 },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
 },
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2 !== null && t2.is$Element()) return t2;
  }
  return;
 },
 first$0: function() { return this.get$first().$call$0(); },
 get$_filtered: function() {
  return $.ListFactory_List$from($.filter(this._childNodes, new $.FilteredElementList__filtered_anon()));
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ChildrenElementList = {"":
 ["_childElements", "_element?"],
 super: "Object",
 last$0: function() {
  return this._element.get$$$dom_lastElementChild();
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._element.$dom_removeChild$1(result);
  return result;
 },
 clear$0: function() {
  this._element.set$text('');
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($._Lists_getRange(this, start, rangeLength, []));
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._element; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 iterator$0: function() {
  return $.iterator(this._toList$0());
 },
 addLast$1: function(value) {
  return this.add$1(value);
 },
 add$1: function(value) {
  this._element.$dom_appendChild$1(value);
  return value;
 },
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC2);
 },
 operator$indexSet$2: function(index, value) {
  this._element.$dom_replaceChild$2(value, $.index(this._childElements, index));
 },
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
 },
 get$length: function() {
  return $.get$length(this._childElements);
 },
 isEmpty$0: function() {
  return this._element.get$$$dom_firstElementChild() == null;
 },
 filter$1: function(f) {
  var output = [];
  this.forEach$1(new $._ChildrenElementList_filter_anon(f, output));
  return $._FrozenElementList$_wrap(output);
 },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 get$first: function() {
  return this._element.get$$$dom_firstElementChild();
 },
 first$0: function() { return this.get$first().$call$0(); },
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._toList$0$bailout(1, t1);
  var output = $.ListFactory_List(t1.length);
  for (var len = t1.length, i = 0; i < len; ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t3 = t1[i];
    var t4 = output.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    output[i] = t3;
  }
  return output;
 },
 _toList$0$bailout: function(state, t1) {
  var output = $.ListFactory_List($.get$length(t1));
  for (var len = $.get$length(t1), i = 0; $.ltB(i, len); ++i) {
    var t2 = $.index(t1, i);
    var t3 = output.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    output[i] = t2;
  }
  return output;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 super: "Object",
 last$0: function() {
  return $.last(this._nodeList);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC2);
 },
 clear$0: function() {
  throw $.captureStackTrace($.CTC2);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
 },
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($.getRange(this._nodeList, start, rangeLength));
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC2);
 },
 iterator$0: function() {
  return $._FrozenElementListIterator$(this);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC2);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.CTC2);
 },
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC2);
 },
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
 },
 get$length: function() {
  return $.get$length(this._nodeList);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
 },
 filter$1: function(f) {
  var out = $._ElementList$([]);
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && out.add$1(t2);
  }
  return out;
 },
 forEach$1: function(f) {
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 get$first: function() {
  return $.index(this._nodeList, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_lib_index", "_list"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._lib_index;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = $.get$length(this._list);
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 < t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_index;
    case 1:
      state = 0;
      var t2 = $.get$length(this._list);
    case 2:
      state = 0;
      return $.lt(t1, t2);
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._lib_index;
  this._lib_index = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, t1) {
  var t2 = this._lib_index;
  this._lib_index = t2 + 1;
  return $.index(t1, t2);
 }
};

$$._ElementList = {"":
 ["_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._ElementList$($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
 },
 filter$1: function(f) {
  return $._ElementList$($._ListWrapper.prototype.filter$1.call(this, f));
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._this.$dom_removeChild$1(result);
  return result;
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 get$first: function() {
  return this._this.firstChild;;
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 get$first: function() {
  return $.index(this._list, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
 },
 last$0: function() {
  return $.last(this._list);
 },
 removeLast$0: function() {
  return $.removeLast(this._list);
 },
 clear$0: function() {
  return $.clear(this._list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
 },
 addAll$1: function(collection) {
  return $.addAll(this._list, collection);
 },
 addLast$1: function(value) {
  return $.addLast(this._list, value);
 },
 add$1: function(value) {
  return $.add$1(this._list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
 },
 operator$index$1: function(index) {
  return $.index(this._list, index);
 },
 get$length: function() {
  return $.get$length(this._list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._list);
 },
 filter$1: function(f) {
  return $.filter(this._list, f);
 },
 forEach$1: function(f) {
  return $.forEach(this._list, f);
 },
 iterator$0: function() {
  return $.iterator(this._list);
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._list, f));
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._pos;
  this._pos = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, t1) {
  var t2 = this._pos;
  this._pos = t2 + 1;
  return $.index(t1, t2);
 },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t2, t1);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t2 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
 },
 reset$0: function() {
 },
 operator$indexSet$2: function(object, info) {
 },
 operator$index$1: function(object) {
  return;
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List())) return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map()) return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort) return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync) return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = ({});
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null)) return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null)) return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
 },
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null)) return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    result[i] = t2;
  }
  return result;
 },
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Manager = {"":
 ["managers", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
 }
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  var old = $._globalState0().get$currentContext();
  $._globalState0().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState0().set$currentContext(t1);
    t1 = old;
    !(t1 == null) && t1._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t1 = $._globalState0();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
 }
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState0().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState0().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  if (!($._window() == null)) new $._EventLoop__runHelper_next(this).$call$0();
  else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState0().get$isWorker() === true) $._globalState0().maybeCloseWorker$0();
    else {
      if (!($._globalState0().get$rootContext() == null) && $._globalState0().get$isolates().containsKey$1($._globalState0().get$rootContext().get$id()) === true && $._globalState0().get$fromCommandLine() === true && $.isEmpty($._globalState0().get$rootContext().get$ports()) === true) throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true) return;
  return t1.removeFirst$0();
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
 },
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  var t1 = this._workerId << 16 ^ this._isolateId << 8;
  var t2 = this._receivePortId;
  if (typeof t2 !== 'number') throw $.iae(t2);
  return (t1 ^ t2) >>> 0;
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort && $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other.get$_isolateId()) && $.eqB(this._receivePortId, other.get$_receivePortId());
 },
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState0().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
 },
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
 },
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number') return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
 },
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
 },
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
 }
};

$$.MVCNotifier = {"":
 [],
 super: "Object",
 initializeNotifier$1: function(key) {
  this.multitonKey = key;
 }
};

$$.MVCProxy = {"":
 ["data", "name", "multitonKey"],
 super: "MVCNotifier",
 onRegister$0: function() {
 },
 getData$0: function() {
  return this.data;
 },
 getName$0: function() {
  return this.name;
 }
};

$$.MVCFacade = {"":
 ["multitonKey", "view", "model", "controller"],
 super: "Object",
 initializeNotifier$1: function(key) {
  this.multitonKey = key;
 },
 retrieveProxy$1: function(proxyName) {
  return this.model.retrieveProxy$1(proxyName);
 },
 registerProxy$1: function(proxy) {
  this.model.registerProxy$1(proxy);
 },
 initializeView$0: function() {
  if (!(this.view == null)) return;
  this.view = $.MVCView_getInstance(this.multitonKey);
 },
 initializeModel$0: function() {
  if (!(this.model == null)) return;
  this.model = $.MVCModel_getInstance(this.multitonKey);
 },
 initializeController$0: function() {
  if (!(this.controller == null)) return;
  this.controller = $.MVCController_getInstance(this.multitonKey);
 },
 initializeFacade$0: function() {
  this.initializeModel$0();
  this.initializeController$0();
  this.initializeView$0();
 },
 MVCFacade$1: function(key) {
  if (!($.index($.MVCFacade_instanceMap, key) == null)) throw $.captureStackTrace($.MultitonFacadeExistsError$());
  this.initializeNotifier$1(key);
  $.indexSet($.MVCFacade_instanceMap, this.multitonKey, this);
  this.initializeFacade$0();
 }
};

$$.MultitonFacadeExistsError = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'IFacade Multiton instance already constructed for this key.';
 }
};

$$.MVCModel = {"":
 ["multitonKey", "proxyMap"],
 super: "Object",
 retrieveProxy$1: function(proxyName) {
  return $.index(this.proxyMap, proxyName);
 },
 registerProxy$1: function(proxy) {
  proxy.initializeNotifier$1(this.multitonKey);
  $.indexSet(this.proxyMap, proxy.getName$0(), proxy);
  proxy.onRegister$0();
 },
 initializeModel$0: function() {
 },
 MVCModel$1: function(key) {
  if (!($.index($.MVCModel_instanceMap, key) == null)) throw $.captureStackTrace($.MultitonModelExistsError$());
  this.multitonKey = key;
  $.indexSet($.MVCModel_instanceMap, this.multitonKey, this);
  this.proxyMap = $.HashMapImplementation$();
  this.initializeModel$0();
 }
};

$$.MultitonModelExistsError = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'IModel Multiton instance already constructed for this key.';
 }
};

$$.MVCView = {"":
 ["multitonKey", "observerMap", "mediatorMap"],
 super: "Object",
 initializeView$0: function() {
 },
 MVCView$1: function(key) {
  if (!($.index($.MVCView_instanceMap, key) == null)) throw $.captureStackTrace($.MultitonViewExistsError$());
  this.multitonKey = key;
  $.indexSet($.MVCView_instanceMap, this.multitonKey, this);
  this.mediatorMap = $.HashMapImplementation$();
  this.observerMap = $.HashMapImplementation$();
  this.initializeView$0();
 }
};

$$.MultitonViewExistsError = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'IViewMultiton instance already constructed for this key.';
 }
};

$$.MVCController = {"":
 ["multitonKey", "commandMap", "view"],
 super: "Object",
 initializeController$0: function() {
  this.view = $.MVCView_getInstance(this.multitonKey);
 },
 MVCController$1: function(key) {
  if (!($.index($.MVCController_instanceMap, key) == null)) throw $.captureStackTrace($.MultitonControllerExistsError$());
  this.multitonKey = key;
  $.indexSet($.MVCController_instanceMap, this.multitonKey, this);
  this.commandMap = $.HashMapImplementation$();
  this.initializeController$0();
 }
};

$$.MultitonControllerExistsError = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'IController Multiton instance already constructed for this key.';
 }
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 $call$2: function(k, v) {
  this.box_0.first_1 !== true && $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
 }
};

$$.FilteredElementList__filtered_anon = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  return typeof n === 'object' && n !== null && n.is$Element();
 }
};

$$._ChildrenElementList_filter_anon = {"":
 ["f_1", "output_0"],
 super: "Closure",
 $call$1: function(element) {
  this.f_1.$call$1(element) === true && $.add$1(this.output_0, element);
 }
};

$$.FilteredElementList_removeRange_anon = {"":
 [],
 super: "Closure",
 $call$1: function(el) {
  return el.remove$0();
 }
};

$$.HashSetImplementation_addAll__ = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(value) {
  this.this_0.add$1(value);
 }
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key);
 }
};

$$.HashSetImplementation_filter__ = {"":
 ["result_1", "f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key) === true && $.add$1(this.result_1, key);
 }
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$1: function(entry) {
  this.f_0.$call$2(entry.get$key(), entry.get$value());
 }
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
 }
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
 }
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 $call$0: function() {
  return this.closure_0.$call$0();
 }
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 $call$0: function() {
  return this.closure_2.$call$1(this.arg1_1);
 }
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 $call$0: function() {
  return this.closure_5.$call$2(this.arg1_4, this.arg2_3);
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

Isolate.$defineClass('BoundClosure', 'Closure', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
Isolate.$defineClass('BoundClosure0', 'Closure', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState(t1);
  if ($._globalState0().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$();
  $._globalState0().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState0().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState0().get$topEventLoop().run$0();
};

$.PureMVC_Dart$ = function() {
  return new $.PureMVC_Dart();
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b) === true;
  }
  return a === b;
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref) return true;
  }
  return false;
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$.isJsArray = function(value) {
  return !(value == null) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length;
  return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a >= b;
  return a.operator$ge$1(b);
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object')) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.MultitonViewExistsError$ = function() {
  return new $.MultitonViewExistsError();
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._serializeMessage = function(message) {
  if ($._globalState0().get$needSerialization() === true) return $._JsSerializer$().traverse$1(message);
  return $._JsCopier$().traverse$1(message);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) return $.truncate((a) / (b));
  return a.operator$tdiv$1(b);
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  return name$;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0)) return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  if ($.eqB(numberOfArguments, 1)) return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  if ($.eqB(numberOfArguments, 2)) return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || (inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || (tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) return receiver.filter$1(predicate);
  return $.Collections_filter(receiver, [], predicate);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null) {
    if ($._Device_isFirefox() === true) $._cachedBrowserPrefix = '-moz-';
    else $._cachedBrowserPrefix = '-webkit-';
  }
  return $._cachedBrowserPrefix;
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._ElementList$ = function(list) {
  return new $._ElementList(list);
};

$.MVCFacade$ = function(key) {
  var t1 = new $.MVCFacade(null, null, null, null);
  t1.MVCFacade$1(key);
  return t1;
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') return receiver.split(pattern);
  if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp) return receiver.split($.regExpGetNative(pattern));
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') return !($.indexOf$2(receiver, other, startIndex) === -1);
  if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, (String(e))));
  }
};

$._FrozenElementListIterator$ = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection())) {
    if ($.Collections__containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    } else $.Collections__emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o !== null && o.is$Map()) {
      if ($.Collections__containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $.Maps__emitMap(o, result, visiting);
    } else {
      $.add$1(result, o == null ? 'null' : o);
    }
  }
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = ({});
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.MVCController$ = function(key) {
  var t1 = new $.MVCController(null, null, null);
  t1.MVCController$1(key);
  return t1;
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$._ElementFactoryProvider_Element$tag = function(tag) {
  return document.createElement(tag);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a + b;
  return a.operator$add$1(b);
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.Primitives_newList = function(length$) {
  if (length$ == null) return new Array();
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.PureMVC_Dart$().test$0();
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.MultitonModelExistsError$ = function() {
  return new $.MultitonModelExistsError();
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.MultitonFacadeExistsError$ = function() {
  return new $.MultitonFacadeExistsError();
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$._ChildrenElementList$_wrap = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState0().get$currentContext();
};

$.FilteredElementList$ = function(node) {
  return new $.FilteredElementList(node.get$nodes(), node);
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$._FrozenElementList$_wrap = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) return receiver.getRange$2(start, length$);
  if (0 === length$) return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number') return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number') throw $.iae(length$);
  var end = start + length$;
  if (end > a.length) throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata0 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r == null ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$.checkNull = function(object) {
  if (object == null) throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$.MVCModel$ = function(key) {
  var t1 = new $.MVCModel(null, null);
  t1.MVCModel$1(key);
  return t1;
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index)) throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.MVCView$ = function(key) {
  var t1 = new $.MVCView(null, null, null);
  t1.MVCView$1(key);
  return t1;
};

$._globalState0 = function() {
  return $globalState;;
};

$._globalState = function(val) {
  $globalState = val;;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null) {
    if ($.isJsArray(value) === true) return $.Collections_collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value == null) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || ((strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())) return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(t2));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(t2));
      t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = t2;
    }
  }
  return array;
};

$.MultitonControllerExistsError$ = function() {
  return new $.MultitonControllerExistsError();
};

$.IndexOutOfRangeException$ = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f == null) && (!!f.methods)) return f.methods;
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC7)[name$]);
  !(dartMethod == null) && (methods['Object'] = dartMethod);
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState0().get$topEventLoop().run$0();
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a > b;
  return a.operator$gt$1(b);
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + (receiver.charCodeAt(i));
    var hash1 = 536870911 & hash0 + (524287 & hash0 << 10);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + (67108863 & hash << 3);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + (16383 & hash0 << 15);
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.MVCProxy$ = function(name$, data) {
  return new $.MVCProxy(data, name$, null);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.Collections_forEach(receiver, f);
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method == null && !($._dynamicMetadata0() == null)) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method == null)) break;
      }
    }
  }
  if (method == null) method = (methods['Object']);
  var proto = (Object.getPrototypeOf(obj));
  if (method == null) method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC6) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  return $.constructorNameFallback;
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) return a[key];
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.captureStackTrace = function(ex) {
  if (ex == null) ex = $.CTC0;
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
  }
  return a === b;
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.MVCFacade_getInstance = function(key) {
  if (key == null || $.eqB(key, '')) return;
  if ($.MVCFacade_instanceMap == null) $.MVCFacade_instanceMap = $.HashMapImplementation$();
  if ($.index($.MVCFacade_instanceMap, key) == null) $.indexSet($.MVCFacade_instanceMap, key, $.MVCFacade$(key));
  return $.index($.MVCFacade_instanceMap, key);
};

$.MVCView_getInstance = function(key) {
  if (key == null || $.eqB(key, '')) return;
  if ($.MVCView_instanceMap == null) $.MVCView_instanceMap = $.HashMapImplementation$();
  if ($.index($.MVCView_instanceMap, key) == null) $.indexSet($.MVCView_instanceMap, key, $.MVCView$(key));
  return $.index($.MVCView_instanceMap, key);
};

$.MVCController_getInstance = function(key) {
  if (key == null || $.eqB(key, '')) return;
  if ($.MVCController_instanceMap == null) $.MVCController_instanceMap = $.HashMapImplementation$();
  if ($.index($.MVCController_instanceMap, key) == null) $.indexSet($.MVCController_instanceMap, key, $.MVCController$(key));
  return $.index($.MVCController_instanceMap, key);
};

$.MVCModel_getInstance = function(key) {
  if (key == null || $.eqB(key, '')) return;
  if ($.MVCModel_instanceMap == null) $.MVCModel_instanceMap = $.HashMapImplementation$();
  if ($.index($.MVCModel_instanceMap, key) == null) $.indexSet($.MVCModel_instanceMap, key, $.MVCModel$(key));
  return $.index($.MVCModel_instanceMap, key);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  !(target == null) && (target.builtin$typeInfo = typeInfo);
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.document = function() {
  return document;;
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) return ex.dartException;
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NullPointerException$(null, $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NoSuchMethodException$('', name$, [], null);
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true) return $.NullPointerException$(null, $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$('', '<unknown>', [], null);
    }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$();
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j) {
              set.add$1($.index(tagNames, j));
            }
            $.add$1(result, $.MetaInfo$(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1)) {
    $.add$1(accumulator, $.index(a, i));
  }
  return accumulator;
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC2 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC3 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC4 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC5 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC7 = new Isolate.$isolateProperties.Object();
$.CTC6 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC8 = new Isolate.$isolateProperties.EmptyQueueException();
$._cachedBrowserPrefix = null;
$.MVCFacade_instanceMap = null;
$.MVCView_instanceMap = null;
$.MVCController_instanceMap = null;
$.MVCModel_instanceMap = null;
$._getTypeNameOf = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$Element', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('HTMLAnchorElement', [], {
 toString$0: function() {
  return this.toString();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', [], {
 query$1: function(selectors) {
  if ($.CTC4.hasMatch$1(selectors) === true) return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$parent: function() {
  return;
 },
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
 },
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
 },
 get$id: function() {
  return '';
 },
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
    $.clear(this.get$nodes());
  var e = $._ElementFactoryProvider_Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.ListFactory_List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }
 },
 get$innerHTML: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$innerHTML')) {
    var e = $._ElementFactoryProvider_Element$tag('div');
  $.add$1(e.get$nodes(), this.clone$1(true));
  return e.get$innerHTML();
  } else {
    return Object.prototype.get$innerHTML.call(this);
  }
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 },
 get$elements: function() {
  if (this._elements == null) this._elements = $.FilteredElementList$(this);
  return this._elements;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('Element', ["innerHTML=", "id?"], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$$$dom_lastElementChild: function() {
  return this.lastElementChild;;
 },
 get$$$dom_firstElementChild: function() {
  return this.firstElementChild;;
 },
 get$$$dom_children: function() {
  return this.children;;
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 },
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
    return $._ChildrenElementList$_wrap(this);
  } else {
    return Object.prototype.get$elements.call(this);
  }
 },
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
    var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
  } else {
    return Object.prototype.set$elements.call(this, value);
  }
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
 }
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["lib$_FieldSetElementImpl$elements?"], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileWriter', ["length?"], {
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 reset$0: function() {
  return this.reset();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('IDBCursor', ["key?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBObjectStore', [], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('HTMLIFrameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["value=", "pattern?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLKeygenElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMediaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 add$1: function(track) {
  return this.add(track);
 }
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLMetaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 clone$1: function(deep) {
  return this.cloneNode(deep);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 replaceWith$1: function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  } catch (exception) {
    $.unwrapException(exception);
  }
  return this;
 },
 remove$0: function() {
  !(this.get$parent() == null) && this.get$parent().$dom_removeChild$1(this);
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
 }
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
 },
 get$first: function() {
  return this.operator$index$1(0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._parent; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
});

$.$defineNativeClass('HTMLOListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOutputElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLPreElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
  return this.id;;
 },
 set$innerHTML: function(svg) {
  var container = $._ElementFactoryProvider_Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
 },
 get$innerHTML: function() {
  var container = $._ElementFactoryProvider_Element$tag('div');
  var cloned = this.clone$1(true);
  $.addAll(container.get$elements(), cloned.get$elements());
  return container.get$innerHTML();
 },
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
 },
 get$elements: function() {
  return $.FilteredElementList$(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGLineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPatternElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "length="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["lib$_ShadowRootImpl$innerHTML="], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSourceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextTrackCue', ["text!", "id?"], {
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('HTMLUListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMWindow', ["navigator?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 get$id: function() {
  return this.id;;
 }
});

// 254 dynamic classes.
// 269 classes
// 22 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v2/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v3/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v4/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v5/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v6/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v7/*class(_ElementImpl)*/ = [v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v8/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v9/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v10/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v1/*class(_SVGTextContentElementImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v10/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v9/*class(_DocumentImpl)*/],
    ['DocumentFragment', v8/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v2/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v3/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v4/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v5/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v6/*class(_MediaElementImpl)*/],
    ['Element', v7/*class(_ElementImpl)*/],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['Node', [v7/*class(_ElementImpl)*/,v8/*class(_DocumentFragmentImpl)*/,v9/*class(_DocumentImpl)*/,v10/*class(_CharacterDataImpl)*/,v7/*class(_ElementImpl)*/,v8/*class(_DocumentFragmentImpl)*/,v9/*class(_DocumentImpl)*/,v10/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|')],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.$call$0 = $.main
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.startRootIsolate($.main);
  });
} else {
  $.startRootIsolate($.main);
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var collected in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, collected)) {
      var desc = collectedClasses[collected];
      Isolate.$defineClass(collected, desc.super, desc[''], desc);
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
