import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
      const component = create(<ProfileStatus status="it-kams" />); // фейково создали компоненту
      const instance = component.getInstance(); // получили компоненту
      expect(instance.state.status).toBe("it-kams"); // проверяем содержимое в LS в компоненте
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="it-kams" />);
        const root = component.root;
        let span = root.findByType("span"); // находим элемент с типом span
        expect(span).not.toBeNull(); // проверяем что в span есть текст
    });

    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="it-kams" />);
        const root = component.root;
        
        expect(() => {
            let input = root.findByType("input"); // находим элемент с типом input
        }).toThrow(); // проверяем что input нет (функция toThrow() ищет ошибку/ мы ожидаем что input не будет и ожидаем ошибку)
    });

    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status="it-kams" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it-kams"); // проверяем текст span
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="it-kams" />);
        const root = component.root;
        let span = root.findByType("span"); // нашли span
        span.props.onClick();  // кликнули по нему и появился input
        let input = root.findByType("input"); // нашли input
        expect(input.props.value).toBe("it-kams"); // проверяем что в input есть текст
        //expect(input).not.toBeNull(); // проверяем что в input есть текст
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn(); // фейк-функция, которую как колбэк передаем внутрь
        const component = create(<ProfileStatus status="it-kams" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode(); // убираем EditMode и должен быть вызван колбэк

        expect(mockCallback.mock.calls.length).toBe(1); // колбэк должен быть вызван 1 раз 
        
    });
});