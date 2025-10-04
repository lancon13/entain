import { defineBoot } from '@quasar/app-vite/wrappers'
import { Notify, QBtn, QBtnDropdown, QBtnGroup, QBtnToggle, QDialog, QRouteTab, QTab } from 'quasar'
import { ForwardSlots } from 'vue-forward-slots'


export default defineBoot(async ({ app }) => {
    QBtn.props.noCaps = { type: Boolean, default: true }
    QBtn.props.unelevated = { type: Boolean, default: true }
    QBtnDropdown.props.noCaps = { type: Boolean, default: true }
    QBtnToggle.props.noCaps = { type: Boolean, default: true }
    QBtnGroup.props.noCaps = { type: Boolean, default: true }
    QTab.props.noCaps = { type: Boolean, default: true }
    QRouteTab.props.noCaps = { type: Boolean, default: true }
    QDialog.props.transitionShow = { type: String, default: 'jump-down' }
    QDialog.props.transitionHide = { type: String, default: 'jump-up' }

    app.component('ForwardSlots', ForwardSlots)
    
    Notify.registerType('error', {
        icon: 'error',
        classes: 'bg-negative',
        textColor: 'white',
        timeout: 5000,
        actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
        ]
    })

    Notify.registerType('success', {
        icon: 'done',
        classes: 'bg-positive',
        textColor: 'white',
        timeout: 5000,
        actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
        ]
    })

    Notify.registerType('info', {
        icon: 'lightbulb',
        classes: 'bg-info',
        textColor: 'white',
        timeout: 5000,
        actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
        ]
    })

    Notify.registerType('warning', {
        icon: 'exclamation',
        classes: 'bg-warning',
        textColor: 'white',
        timeout: 5000,
        actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
        ]
    })
})