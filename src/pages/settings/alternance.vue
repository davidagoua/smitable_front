<template>
<CalendarView
    class="theme-default holiday-us-traditional holiday-us-official"
>
  <template #header="{ headerProps}">
    <calendar-view-header
        :header-props="headerProps" />
  </template>
</CalendarView>
</template>

<script setup>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"


</script>

<style >
/*
**************************************************************
This theme is the default shipping theme, it includes some
decent defaults, but is separate from the calendar component
to make it easier for users to implement their own themes w/o
having to override as much.
**************************************************************
*/

/* Header */

/*
**************************************************************
This theme is a loose approximation of Google Calendar's UI,
as of May 2020.
**************************************************************
*/

/* Header */

.theme-gcal {
  --event-color-tomato: #d50000;
  --event-color-flamingo: #e67c73;
  --event-color-tangerine: #f4511e;
  --event-color-banana: #f6bf26;
  --event-color-sage: #33b679;
  --event-color-basil: #0b8043;
  --event-color-peacock: #039be5;
  --event-color-blueberry: #3f51b5;
  --event-color-lavender: #7986cb;
  --event-color-grape: #8e24aa;
  --event-color-graphite: #616161;

  font-size: 12px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  border-color: rgb(32 33 36);
}

.theme-gcal .cv-header {
  font-weight: 400;
  padding: 0.6em;
}

.theme-gcal .periodLabel {
  font-size: 1.85em;
  font-weight: 400;
  color: #3c4043;
  margin-left: 0;
}

.theme-gcal .cv-header-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.theme-gcal .cv-header button:not(.currentPeriod) {
  font-family: Roboto, sans-serif;
  background-color: transparent;
  border: none;
  border-radius: 99em;
  font-size: 2em;
  color: #5f6368;
}

.theme-gcal .cv-header button:hover {
  background-color: rgba(32 33 36 3.9%);
}

.theme-gcal .cv-header button.currentPeriod {
  order: -1;
  padding: 0.6em 0.75em;
  margin-right: 1em;
  font-size: 1.2em;
  border-radius: 0.25em;
}

.theme-gcal .cv-header button.previousYear,
.theme-gcal .cv-header button.previousPeriod,
.theme-gcal .cv-header button.nextPeriod,
.theme-gcal .cv-header button.nextYear {
  font-family: "Material Icons", sans-serif;
  font-weight: 400;
  width: 1.5em;
  height: 1.5em;
  padding: 0;
  text-align: center;
  letter-spacing: -0.6em;
  padding-right: 0.6em;
}

.theme-gcal .cv-header button:disabled {
  color: #ccc;
}

.theme-gcal .cv-header-day {
  border-bottom: none;
  text-transform: uppercase;
  padding: 0.75em 0 0.25em;
  color: #70757a;
}

.theme-gcal .cv-week.week1 .cv-day {
  border-top: none;
}

/* Grid */

.theme-gcal .cv-weeknumber {
  color: #808080;
}

.theme-gcal .cv-weeknumber span {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.theme-gcal .cv-day-number {
  display: flex;
  border-radius: 99rem;
  height: 2em;
  width: auto;
  min-width: 2em;
  justify-content: center;
  margin: 0 auto;
  padding: 0.5em 0.4em;
  color: #3c4043;
}

.theme-gcal .cv-day.outsideOfMonth .cv-day-number {
  color: #70757a;
}

.theme-gcal .cv-day.today .cv-day-number {
  margin-top: 0.25rem;
  background-color: #1a73e8;
  color: #fff;
}

.theme-gcal .cv-day[aria-selected="true"] {
  background-color: #ffc;
}

/* Events */

.theme-gcal .cv-item {
  border-color: transparent;
  border-radius: 0.25em;
  background-color: var(--event-color-graphite);
  color: white;
  padding-top: 0.325em;
  padding-bottom: 0.325em;
  padding-left: 0.6em;
}

/* Override metrics to leave space at the end of each item */

.theme-gcal .cv-item.span1 {
  width: calc((100% / 7) - 0.75em);
}

.theme-gcal .cv-item.span2 {
  width: calc((200% / 7) - 0.75em);
}

.theme-gcal .cv-item.span3 {
  width: calc((300% / 7) - 0.75em);
}

.theme-gcal .cv-item.span4 {
  width: calc((400% / 7) - 0.75em);
}

.theme-gcal .cv-item.span5 {
  width: calc((500% / 7) - 0.75em);
}

.theme-gcal .cv-item.span6 {
  width: calc((600% / 7) - 0.75em);
}

.theme-gcal .cv-item.span7 {
  width: calc((700% / 7) - 0.75em);
}

.theme-gcal .cv-item.isHovered {
  filter: brightness(95%);
}

.theme-gcal .cv-item.continued {
  border-left-style: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Event Times */

.theme-gcal .cv-item .startTime,
.theme-gcal .cv-item .endTime {
  font-weight: bold;
  color: #666;
}

/* Drag and drop */

.theme-gcal .cv-day.draghover {
  box-shadow: inset 0 0 0.2em 0.2em yellow;
}


.theme-default .cv-header,
.theme-default .cv-header-day {
  background-color: #f0f0f0;
}

.theme-default .cv-header .periodLabel {
  font-size: 1.5em;
}

.theme-default .cv-header button {
  color: #7f7f7f;
}

.theme-default .cv-header button:disabled {
  color: #ccc;
  background-color: #f7f7f7;
}

/* Grid */

.theme-default .cv-weeknumber {
  background-color: #e0e0e0;
  border-color: #ccc;
  color: #808080;
}

.theme-default .cv-weeknumber span {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.theme-default .cv-day.past {
  background-color: #fafafa;
}

.theme-default .cv-day.outsideOfMonth {
  background-color: #f7f7f7;
}

.theme-default .cv-day.today {
  background-color: #ffe;
}

.theme-default .cv-day[aria-selected="true"] {
  background-color: #ffc;
}

/* Events */

.theme-default .cv-item {
  border-color: #e0e0f0;
  border-radius: 0.5em;
  background-color: #e7e7ff;
  text-overflow: ellipsis;
}

.theme-default .cv-item.purple {
  background-color: #f0e0ff;
  border-color: #e7d7f7;
}

.theme-default .cv-item.orange {
  background-color: #ffe7d0;
  border-color: #f7e0c7;
}

.theme-default .cv-item.continued::before,
.theme-default .cv-item.toBeContinued::after {
  content: " \21e2 ";
  color: #999;
}

.theme-default .cv-item.toBeContinued {
  border-right-style: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.theme-default .cv-item.isHovered.hasUrl {
  text-decoration: underline;
}

.theme-default .cv-item.continued {
  border-left-style: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.cv-item.span3,
.cv-item.span4,
.cv-item.span5,
.cv-item.span6,
.cv-item.span7 {
  text-align: center;
}

/* Event Times */

.theme-default .cv-item .startTime,
.theme-default .cv-item .endTime {
  font-weight: bold;
  color: #666;
}

/* Drag and drop */

.theme-default .cv-day.draghover {
  box-shadow: inset 0 0 0.2em 0.2em yellow;
}


</style>
